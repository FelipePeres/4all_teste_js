const Sequelize = require("sequelize");
const Cliente = require("../model/cliente");
const sequelize = require("../database/database");

const Cartao = sequelize.define("cartoes", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  numero: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
  bandeira:{
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
});

Cliente.hasOne(Cartao, { as: "cliente" });
//Cliente.hasOne(Cartao,{ foreignKey: 'clienteId' });
Cartao.belongsTo(Cliente, { foreignKey: 'clienteId' });

module.exports = Cartao;