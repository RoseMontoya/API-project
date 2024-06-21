'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      })

      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      },
      onDelete: 'CASCADE'
  },
    address: {
      type: DataTypes.STRING,
      allowNull:false
  },
    city: {
      type: DataTypes.STRING,
      allowNull:false
  },
    state: {
      type: DataTypes.STRING,
      allowNull:false
  },
    country: {
      type: DataTypes.STRING,
      allowNull:false
  },
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -90,
        max: 90
      }
  },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        min: -180,
        max: 180
      }
  },
    name: {
      type: DataTypes.STRING(50),
      validate: {
        len: [4, 50]
      }
  },
    description: {
      type: DataTypes.TEXT,
      allowNull:false
  },
    price: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0
      }
  },
  }, {
    sequelize,
    modelName: 'Spot',
    indexes: [
      {
        unique: true,
        fields: ['address', 'city', 'state', 'country'],
        name: 'idx_full_address'
      }
    ]
  });
  return Spot;
};
