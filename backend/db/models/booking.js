'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });

      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        references: {
          model: 'Spots'
        },
        onDelete: 'CASCADE'
      }
  },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      },
      onDelete: 'CASCADE'
  },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        // cannot be in the past
      }
  },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        // cannot be on or before the startDate
      }
  },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
