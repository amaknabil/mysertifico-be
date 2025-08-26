'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const records = [
      {
        id: uuidv4(),
        fullname: 'Ahmad bin Ali',
        email: 'ahmad.ali@example.com',
        message: 'The QR code on my certificate is not scannable. Please help.',
        status: 'new',
        subject: 'Problem with QR Code',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        fullname: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@example.com',
        message: 'I have a payment issue with my recent purchase.',
        status: 'in progress',
        subject: 'Payment Issue',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        message: 'I am unable to login to my account. Can you reset my password?',
        status: 'resolved',
        subject: 'Unable to login',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('contact_us', records, {});
  },

  down: async (queryInterface, Sequelize) => {
    // This will delete the records to clean up the table
    await queryInterface.bulkDelete('contact_us', null, {});
  }
};