("use strict");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Assets", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      shoppingCentreId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "ShoppingCentres",
          key: "id"
        }
      },
      name: {
        type: Sequelize.STRING
      },
      width: {
        type: Sequelize.NUMBER
      },
      height: {
        type: Sequelize.NUMBER
      },
      location: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Assets");
  }
};
