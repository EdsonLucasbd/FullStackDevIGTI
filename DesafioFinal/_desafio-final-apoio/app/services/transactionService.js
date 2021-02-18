const TransactionModel = require("../models/TransactionModel.js");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const create = async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    await newTransaction.save();

    res.send({ message: "Transação inserida com sucesso", transaction: newTransaction });
  } catch (error) {
    res.status(500).send("Algum erro ocorreu ao salvar");
  }
};

const findByPeriod = async (req, res) => {
  const period = req.query.period;
  if (!period) {
    res.status(400).send({
      message:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato aaaa-mm, ex: ?period=2020-05',
    });
  }
  try {
    const filteredTransactions = await TransactionModel.find({ yearMonth: period });
    res.send({transactions: filteredTransactions});
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  if (!data) {
    return res
      .status(400)
      .send({ message: "Necessário informar os dados para a atualização" });
  }

  try {
    const newTransaction = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );
    if (!newTransaction) {
      res.status(404).send("Nenhuma transação encontrada");
    } else {
      res.status(200).send({transaction: newTransaction});
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: `Erro ao atualizar a transação id: ${id}, ${error}` });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndDelete({ _id: id });
    if (!transaction) {
      res.status(404).send("Nenhuma transação encontrada");
    } else {
      res.status(200).send("Transação deletada");
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar a transação id: " + id });
  }
};

module.exports = { create, findByPeriod, update, remove };
