const Sequelize = require("sequelize");
const Cliente = require("../model/cliente");
const sequelize = require("../database/database");

const Contato = sequelize.define("contato", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nome: {
    allowNull: true,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
  numero: {
    allowNull: true,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
  banco: {
    allowNull: true,
    type: Sequelize.STRING(255),
  }
});

Cliente.hasOne(Contato, { as: "cliente_contato" });
Contato.belongsTo(Cliente, { foreignKey: 'clienteContatoId' });

module.exports = Contato;
