'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('contact_us', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'unread',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('contact_us', 'status');
  }
};