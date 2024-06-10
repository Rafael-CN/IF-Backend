const controllers = {};

controllers.clientes = require("./Cliente.controller.js");
controllers.compras = require("./Compra.controller.js");
controllers.motoristas = require("./Motorista.controller.js");
controllers.passagens = require("./Passagem.controller.js");
controllers.viagens = require("./Viagem.controller.js");

module.exports = controllers;
