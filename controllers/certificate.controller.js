const asyncHandler = require("express-async-handler");
const { Batch, Recipient, Organization } = require("../models");
const CustomError = require("../utils/customError");
const { db } = require("../config/db.config");
const { Op } = require("sequelize");

const createCertificateHandler = asyncHandler(async (req, res) => {
  const { creator_id, organization_id, title, list_recipient_id } = req.body;

  //get creator id from jwt after this

  if (!creator_id || !organization_id || !title || !list_recipient_id) {
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
    // This [Op.or] tells Sequelize to find matches where EITHER
    // the batch title is like the search query OR
    // the organization name is like the search query.
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
        // 'required' is not needed here because the filter is in the main 'where' clause
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

module.exports = {
  getAllCertificateBatches,
  createCertificateHandler,
  getSummaryCertificate,
};
