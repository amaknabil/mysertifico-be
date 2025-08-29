const asyncHandler = require("express-async-handler");
// Import the User model
const { Batch, Recipient, Organization, User } = require("../models");
const CustomError = require("../utils/customError");
const { db } = require("../config/db.config");
const { Op } = require("sequelize");

const createCertificateHandler = asyncHandler(async (req, res) => {
  const { creator_id, organization_id, title, list_recipient_id, template_id } =
    req.body;

  if (
    !creator_id ||
    !organization_id ||
    !title ||
    !list_recipient_id ||
    !template_id
  ) {
    throw new CustomError(
      "Please provide all details for certificate creation",
      400
    );
  }

  const transaction = await db.transaction();

  try {
    const newBatchCertificate = await Batch.create(
      {
        organization_id: organization_id,
        creator_id: creator_id,
        title: title,
        status: "Pending",
        template_id: template_id,
      },
      { transaction }
    );

    const recipientRecords = list_recipient_id.map((user_id) => ({
      batch_id: newBatchCertificate.batch_id,
      user_id: user_id,
    }));

    await Recipient.bulkCreate(recipientRecords, { transaction });

    res.status(201).json({
      status: "success",
      message: `Successfully created batch '${title}' and issued certificates to ${recipientRecords.length} recipients.`,
      data: newBatchCertificate,
    });

    await transaction.commit();
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
});

const getAllCertificateBatches = asyncHandler(async (req, res) => {
  // --- 1. Pagination ---
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  // --- 2. Build Search Clause Conditionally ---
  const { searchQuery } = req.query;
  const batchWhereClause = {};

  if (searchQuery) {
    batchWhereClause[Op.or] = [
      { title: { [Op.like]: `%${searchQuery}%` } },
      { "$Organization.organization_name$": { [Op.like]: `%${searchQuery}%` } },
    ];
  }

  // --- 3. Fetch Data ---
  const { count, rows: batches } = await Batch.findAndCountAll({
    where: batchWhereClause,
    limit: limit,
    offset: offset,
    attributes: [
      ["batch_id", "batchId"],
      ["title", "batchName"],
      ["issued_at", "issueDate"],
      [db.fn("COUNT", db.col("Recipients.recipient_id")), "recipientCount"],
    ],
    include: [
      {
        model: Organization,
        attributes: ["organization_name"],
      },
      {
        model: Recipient,
        as: "Recipients",
        attributes: [],
      },
    ],
    group: ["Batch.batch_id", "Organization.organization_id"],
    order: [["issued_at", "DESC"]],
    subQuery: false,
  });

  // --- 4. Send Response ---
  const message = searchQuery
    ? "Batches matching your search criteria."
    : "All batches retrieved.";

  res.status(200).json({
    status: "success",
    message,
    data: {
      totalBatches: count.length,
      totalPages: Math.ceil(count.length / limit),
      currentPage: page,
      batches: batches,
    },
  });
});

const getSummaryCertificate = asyncHandler(async (req, res) => {
  const certificates = await Recipient.findAll();
  const total = certificates.length;

  res.status(200).json({
    status: "success",
    data: total,
  });
});

const getAllCertificateBatchesByOrganization = asyncHandler(
  async (req, res) => {
    const { organization_id } = req.params;
    // --- 1. Pagination ---
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    // --- 2. Build Search Clause Conditionally ---
    const { searchQuery } = req.query;
    const batchWhereClause = { organization_id }; // Always filter by the organization

    if (searchQuery) {
      batchWhereClause.title = { [Op.like]: `%${searchQuery}%` };
    }

    // --- 3. Fetch Data ---
    const { count, rows: batches } = await Batch.findAndCountAll({
      where: batchWhereClause,
      limit: limit,
      offset: offset,
      attributes: [
        ["batch_id", "batchId"],
        ["title", "batchName"],
        ["status", "status"],
        ["issued_at", "issueDate"],
      ],
      include: [
        {
          model: Organization,
          attributes: ["organization_name"],
        },
        {
          model: Recipient,
          as: "Recipients",
          attributes: ["recipient_id"], // Fetch an attribute to make the join
          include: [
            {
              model: User,
              attributes: ["full_name"], // Fetch the recipient's name from the User model
            },
          ],
        },
      ],
      order: [["issued_at", "DESC"]],
      distinct: true,
    });

    // --- 4. Format the response to include recipient names and count ---
    const formattedBatches = batches.map(batch => {
      const plainBatch = batch.get({ plain: true });
      const recipients = plainBatch.Recipients.map(recipient => recipient.User.full_name);
      
      // Remove the nested Recipients object for a cleaner output
      delete plainBatch.Recipients;

      return {
        ...plainBatch,
        recipientCount: recipients.length,
        recipients: recipients,
      };
    });

    // --- 5. Send Response ---
    const message = searchQuery
      ? "Batches matching your search criteria."
      : "All batches for this organization retrieved.";

    res.status(200).json({
      status: "success",
      message,
      data: {
        totalBatches: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        batches: formattedBatches,
      },
    });
  }
);


module.exports = {
  getAllCertificateBatches,
  createCertificateHandler,
  getSummaryCertificate,
  getAllCertificateBatchesByOrganization,
};
