const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cliente = require("./Cliente.js")(sequelize, Sequelize);
db.compra = require("./Compra.js")(sequelize, Sequelize);
db.motorista = require("./Motorista.js")(sequelize, Sequelize);
db.passagem = require("./Passagem.js")(sequelize, Sequelize);
db.viagem = require("./Viagem.js")(sequelize, Sequelize);

db.viagem.hasMany(db.passagem);
db.passagem.belongsTo(db.viagem);

db.motorista.hasMany(db.viagem);
db.viagem.belongsTo(db.motorista);

db.cliente.hasMany(db.compra);
db.compra.belongsTo(db.cliente);

db.passagem.hasMany(db.compra);
db.compra.belongsTo(db.passagem);

module.exports = db;
