"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ShoppingCentres",
      [
        {
          id: "fad19641-af4c-4dac-a23e-0b97e32c1c02",
          name: "Westfield Chatswood",
          address: "1 Anderson Street, Chatswood NSW 2067",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ShoppingCentres", [
      {
        name: "Westfield Chatswood"
      }
    ]);
  }
};
