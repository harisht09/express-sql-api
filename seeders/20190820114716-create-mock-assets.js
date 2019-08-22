"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Assets",
      [
        {
          id: "d968f101-03f9-4898-8583-b51c3dbc8bae",
          shoppingCentreId: "fad19641-af4c-4dac-a23e-0b97e32c1c02",
          name: "Guzman Y Gomez Lunch Special",
          location: "Level 5 Food Court",
          width: 500,
          height: 500,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Assets", [
      {
        name: "Guzman Y Gomez"
      }
    ]);
  }
};
