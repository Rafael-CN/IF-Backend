const db = require("../models");
const Compras = db.compra;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.dataCompra) {
		res.status(400).send({
			message: "Conteúdo não pode estar vazio!",
		});
		return;
	}
	const compra = {
		dataCompra: req.body.dataCompra,
		clienteId: req.body.clienteId,
		passagemId: req.body.passagemId,
	};

	Compras.create(compra)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro durante a criação de compra.",
			});
		});
};

exports.findAll = (req, res) => {
	const clienteId = req.query.clienteId;
	var condition = clienteId ? { clienteId: { [Op.eq]: clienteId } } : null;

	Compras.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro durante a procura por compra.",
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Compras.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não é possível achar compra com o id= ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erro na busca por compra pelo id=" + id,
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;
	Compras.update(req.body, {
		where: { id: id },
	}).then((num) => {
		if (num == 1) {
			res.send({
				message: "compra foi atualizada com sucesso.",
			});
		} else {
			res.send({
				message: `Não foi possível atualizar compra com id= ${id}. Talvez o
compra não tenha sido encontrada ou req.body está vazio!`,
			});
		}
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Compras.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "compra foi deletado com sucesso!",
				});
			} else {
				res.send({
					message: `Não é possível deletar esse compra. Ele não foi encontrado`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Não é possível deletar compra com id=" + id,
			});
		});
};

exports.deleteAll = (req, res) => {
	Compras.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} compras foram deletados com sucesso!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro enquanto deletava os compras.",
			});
		});
};
