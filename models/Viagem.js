module.exports = (sequelize, Sequelize) => {
  const Viagem = sequelize.define(
    "viagem",
    {
      dataPartida: { type: Sequelize.DATE },
      dataChegada: { type: Sequelize.DATE },
      cidadeOrigem: { type: Sequelize.STRING },
      cidadeDestino: { type: Sequelize.STRING },
    },
    { freezeTableName: true }
  );
  return Viagem;
};
