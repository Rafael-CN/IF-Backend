const db = require("../models");
const Passagens = db.passagem;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.viagemId) {
		res.status(400).send({
			message: "Conteúdo não pode estar vazio!",
		});
		return;
	}
	const passagem = {
		numAssento: req.body.numAssento,
		preco: req.body.preco,
		status: req.body.status,
		viagemId: req.body.viagemId,
	};

	Passagens.create(passagem)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro durante a criação da passagem.",
			});
		});
};

exports.findAll = (req, res) => {
	const status = req.query.status;
	var condition = status ? { status: { [Op.iLike]: `${status}%` } } : null;

	Passagens.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro durante a procura por passagens.",
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Passagens.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não é possível achar a passagem com o id= ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erro na busca por passagem pelo id=" + id,
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;
	Passagens.update(req.body, {
		where: { id: id },
	}).then((num) => {
		if (num == 1) {
			res.send({
				message: "Passagem foi atualizada com sucesso.",
			});
		} else {
			res.send({
				message: `Não foi possível atualizar a passagem com id= ${id}. Talvez a passagem não tenha sido encontrada ou req.body está vazio!`,
			});
		}
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Passagens.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Passagem foi deletada com sucesso!",
				});
			} else {
				res.send({
					message: `Não é possível deletar essa passagem. Ela não foi encontrado`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Não é possível deletar passagem com id=" + id,
			});
		});
};

exports.deleteAll = (req, res) => {
	Passagens.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} passagens foram deletadas com sucesso!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro enquanto deletava os passagens.",
			});
		});
};
