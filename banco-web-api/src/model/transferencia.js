const Sequelize = require("sequelize");
const Cliente   = require("../model/cliente");
const Contato   = require("../model/contato");
const Cartao    = require("../model/cartao");
const sequelize = require("../database/database");

const Transferencia = sequelize.define("transferecia", {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  valor: {
    allowNull: true,
    type: Sequelize.DECIMAL(10,2)
  },
  valor_devido: {
    allowNull: true,
    type: Sequelize.DECIMAL(10,2)
  },
});

Cliente.hasOne(Transferencia, { as: "cliente_env_" });
Contato.hasOne(Transferencia, { as: "contato_rec_" });

Cartao.hasOne(Transferencia, {
  foreignKey: {
    name: 'tem_cartao',
    allowNull: true
  }
});

Transferencia.belongsTo(Cliente, { foreignKey: 'clienteEnvId' });
Transferencia.belongsTo(Contato, { foreignKey: 'contatoRecId' });
Transferencia.belongsTo(Cartao, {foreignKey: 'tem_cartao'});

module.exports = Transferencia;