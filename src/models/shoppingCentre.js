'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShoppingCentre = sequelize.define(
    'ShoppingCentre',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING
    },
    {}
  );
  ShoppingCentre.associate = function(models) {
    ShoppingCentre.hasMany(models.Asset, { as: 'assets' });
  };
  return ShoppingCentre;
};
