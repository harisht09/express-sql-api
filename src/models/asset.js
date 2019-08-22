'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    'Asset',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      shoppingCentreId: DataTypes.UUID,
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      width: DataTypes.NUMBER,
      height: DataTypes.NUMBER,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  Asset.associate = function(models) {
    Asset.belongsTo(models.User, {
      foreignId: 'shoppingCentreId',
      as: 'shoppingCentre'
    });
  };
  return Asset;
};
