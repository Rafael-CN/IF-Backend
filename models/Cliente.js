module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define(
    "cliente",
    {
      cpf: { type: Sequelize.STRING },
      nome: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      dataNascimento: { type: Sequelize.DATEONLY },
    },
    { freezeTableName: true }
  );
  return Cliente;
};
