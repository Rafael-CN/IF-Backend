const db = require("../models");
const Clientes = db.cliente;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.nome) {
		res.status(400).send({
			message: "Conteúdo não pode estar vazio!",
		});
		return;
	}
	const cliente = {
		cpf: req.body.cpf,
		nome: req.body.nome,
		email: req.body.email,
		dataNascimento: req.body.dataNascimento,
	};

	Clientes.create(cliente)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro durante a criação de clientes.",
			});
		});
};

exports.findAll = (req, res) => {
	const nome = req.query.nome;
	var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

	Clientes.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro durante a procura por cliente.",
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Clientes.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não é possível achar cliente com o id= ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erro na busca por cliente pelo id=" + id,
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;
	Clientes.update(req.body, {
		where: { id: id },
	}).then((num) => {
		if (num == 1) {
			res.send({
				message: "cliente foi atualizada com sucesso.",
			});
		} else {
			res.send({
				message: `Não foi possível atualizar cliente com id= ${id}. Talvez o
cliente não tenha sido encontrada ou req.body está vazio!`,
			});
		}
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Clientes.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "cliente foi deletado com sucesso!",
				});
			} else {
				res.send({
					message: `Não é possível deletar esse cliente. Ele não foi encontrado`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Não é possível deletar cliente com id=" + id,
			});
		});
};

exports.deleteAll = (req, res) => {
	Clientes.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} clientes foram deletados com sucesso!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro enquanto deletava os clientes.",
			});
		});
};
