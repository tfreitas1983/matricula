const db = require("../models")
const Usuario = db.user


exports.buscarTodos = (req, res) => {
    const username = req.query.username
    var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {}

    Usuario.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar os usuários"
        })
    })
}
 

exports.buscarUm = (req, res) => {
    const id = req.params.id

    Usuario.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado o usuário com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o usuário com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Usuario.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar o usuário com o id=${id}. `
                })
            } else res.send({ message: "Uusário alterado com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar o usuário com o id " + id
            })
        })
}

exports.apagar = (req, res) => {
    const id = req.params.id

    SubPrefeitura.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Não foi possível encontrar e/ou deletaro usuário com o id " + id
                })
            } else {
                res.send({
                    message: "Usuário deletado com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível deletar o usuário com o id " + id
            })
        })
}





