module.exports = (sequelize, Sequelize) => {
  const Passagem = sequelize.define(
    "passagem",
    {
      numAssento: { type: Sequelize.INTEGER },
      preco: { type: Sequelize.DOUBLE },
      status: { type: Sequelize.STRING },
    },
    { freezeTableName: true }
  );
  return Passagem;
};
