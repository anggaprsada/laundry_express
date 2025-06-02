'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    productName: {
      type: DataTypes.ENUM('Cepat', 'Kilat', 'Mantap'),
      allowNull: false
    },
    quantity: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Processing', 'Completed', 'Cancelled'),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    }
  }, {
    tableName: 'orders',
    underscored: true
  });

  Order.associate = function(models) {
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
  };

  return Order;
};
