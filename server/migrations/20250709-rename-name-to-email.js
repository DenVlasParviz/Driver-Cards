/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "name", "email");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "email", "name");
  },
};
