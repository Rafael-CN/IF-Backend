const db = require("../models");
const Motoristas = db.motorista;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nome) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }
  const motorista = {
    cpf: req.body.cpf,
    nome: req.body.nome,
    numRegistro: req.body.numRegistro,
    telefone: req.body.telefone,
  };

  Motoristas.create(motorista)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação do motorista.",
      });
    });
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Motoristas.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por motoristas.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Motoristas.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar o motorista com o id= ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por motorista pelo id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Motoristas.update(req.body, {
    where: { id: id },
  }).then((num) => {
    if (num == 1) {
      res.send({
        message: "Motorista foi atualizado com sucesso.",
      });
    } else {
      res.send({
        message: `Não foi possível atualizar o motorista com id= ${id}. Talvez o motorista não tenha sido encontrado ou req.body está vazio!`,
      });
    }
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Motoristas.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Motorista foi deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar esse motorista. Ele não foi encontrado`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar motorista com id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Motoristas.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} motoristas foram deletados com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava os motoristas.",
      });
    });
};
