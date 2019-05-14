const Sequelize = require("sequelize");

const sequelize = require("../database/database");

const Cliente = sequelize.define("clientes", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nome: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
  numero: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
  senha: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
  saldo: {
    allowNull: true,
    type: Sequelize.DECIMAL(10,2)
  }
});

module.exports = Cliente;
