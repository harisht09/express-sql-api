"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "cb4d48c8-f9e9-4af6-8538-42e39386a8bf",
          username: "admin",
          password:
            "$2b$10$vkzbkKEC02rXDFTlUoN.vOBFfo9i1xTj.2.Nkel330J./icrxYcbu",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", [
      {
        username: "admin"
      }
    ]);
  }
};
