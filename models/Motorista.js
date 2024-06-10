module.exports = (sequelize, Sequelize) => {
  const Motorista = sequelize.define(
    "motorista",
    {
      cpf: { type: Sequelize.STRING },
      nome: { type: Sequelize.STRING },
      numRegistro: { type: Sequelize.STRING },
      telefone: { type: Sequelize.STRING },
    },
    { freezeTableName: true }
  );
  return Motorista;
};
