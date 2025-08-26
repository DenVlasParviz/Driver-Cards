// migrations/XXXXXXXXXXXXXX-add-timestamps-to-drivers.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("drivers", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("drivers", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("drivers", "created_at");
    await queryInterface.removeColumn("drivers", "updated_at");
  }
};
