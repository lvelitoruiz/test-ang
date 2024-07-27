const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const PRIORITIES = ["normal", "importante", "urgente"];
const CATEGORIES = [
  "hogar",
  "trabajo",
  "hobby",
  "compras",
  "salidas",
  "viajes",
];

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  description: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 500]
    }
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  priority: {
    type: DataTypes.ENUM(...PRIORITIES),
    defaultValue: 'normal'
  },
  category: {
    type: DataTypes.ENUM(...CATEGORIES),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

module.exports = Task;
module.exports.CATEGORIES = CATEGORIES;
module.exports.PRIORITIES = PRIORITIES;