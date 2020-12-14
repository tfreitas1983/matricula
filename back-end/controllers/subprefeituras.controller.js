const db = require("../models")
const SubPrefeitura = db.subprefeituras


exports.cadastrar = (req, res) => {
    if (!req.body.descricao) {
        res.status(400).send({ message: "O nome da SubPrefeitura deve ser preenchida"})
        return
    }

    const subprefeitura = new SubPrefeitura ({
        descricao: req.body.descricao,
        situacao: req.body.situacao ? req.body.situacao: true
    })

    subprefeitura
        .save(subprefeitura)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a subprefeitura"
            })
        })
}

exports.buscarTodos = (req,res) => {
    const {page = 1} = req.query;
    const descricao = req.query.descricao

    var condition = descricao ? { descricao: { $regex: new RegExp(descricao), $options: "i" } } : {}

    //Verifica se foi passado a descrição na busca
    if (descricao) {
        var query = SubPrefeitura.find(condition)
    }

    SubPrefeitura.paginate(query,{page, limit: 500})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar as subprefeituras"
        })
    })
}


exports.buscarUm = (req, res) => {
    const id = req.params.id

    SubPrefeitura.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrada a subprefeitura com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a SubPrefeitura com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    SubPrefeitura.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar a SubPrefeitura com o id=${id}. `
                })
            } else res.send({ message: "SubPrefeitura alterada com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar a SubPrefeitura com o id " + id
            })
        })
}

exports.apagar = (req, res) => {
    const id = req.params.id

    SubPrefeitura.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Não foi possível encontrar e/ou deletar a SubPrefeitura com o id " + id
                })
            } else {
                res.send({
                    message: "SubPrefeitura deletada com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível deletar a SubPrefeitura com o id " + id
            })
        })
}

exports.apagarTodos = (req, res) => {
    SubPrefeitura.deleteMany({})
        .then(data => {
            res.send({
                message: `Todos as SubPrefeituras foram deletadas com sucesso`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao deletar todos as SubPrefeitura"
            })
        })
}

exports.buscarAtivos = (req, res) => {
    SubPrefeitura.find({ situacao: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar as SubPrefeituras ativas"
            })
        })
}




