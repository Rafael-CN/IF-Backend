const db = require("../models");
const Viagens = db.viagem;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.motoristumId) {
		res.status(400).send({
			message: "Conteúdo não pode estar vazio!",
		});
		return;
	}
	const viagem = {
		dataPartida: req.body.dataPartida,
		dataChegada: req.body.dataChegada,
		cidadeOrigem: req.body.cidadeOrigem,
		cidadeDestino: req.body.cidadeDestino,
		motoristumId: req.body.motoristumId,
	};

	Viagens.create(viagem)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro durante a criação da viagem.",
			});
		});
};

exports.findAll = (req, res) => {
	const cidadeDestino = req.query.cidadeDestino;
	var condition = cidadeDestino
		? { cidadeDestino: { [Op.iLike]: `%${cidadeDestino}%` } }
		: null;

	Viagens.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro durante a procura por viagens.",
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Viagens.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não é possível achar a viagem com o id= ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erro na busca por viagem pelo id=" + id,
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;
	Viagens.update(req.body, {
		where: { id: id },
	}).then((num) => {
		if (num == 1) {
			res.send({
				message: "Viagem foi atualizada com sucesso.",
			});
		} else {
			res.send({
				message: `Não foi possível atualizar a viagem com id= ${id}. Talvez a viagem não tenha sido encontrada ou req.body está vazio!`,
			});
		}
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Viagens.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Viagem foi deletada com sucesso!",
				});
			} else {
				res.send({
					message: `Não é possível deletar essa viagem. Ela não foi encontrado`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Não é possível deletar viagem com id=" + id,
			});
		});
};

exports.deleteAll = (req, res) => {
	Viagens.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} viagens foram deletadas com sucesso!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro enquanto deletava as viagens.",
			});
		});
};
