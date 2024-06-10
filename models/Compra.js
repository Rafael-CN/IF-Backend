module.exports = (sequelize, Sequelize) => {
  const Compra = sequelize.define(
    "compra",
    {
      dataCompra: { type: Sequelize.DATE },
    },
    { freezeTableName: true }
  );
  return Compra;
};
