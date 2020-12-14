const db = require("../models")
const Curso = db.cursos


exports.cadastrar = (req, res) => {
    if (!req.body.descricao) {
        res.status(400).send({ message: "O nome do curso deve ser preenchido"})
        return
    }

    const curso = new Curso ({
        descricao: req.body.descricao,
        situacao: req.body.situacao ? req.body.situacao: true
    })

    curso
        .save(curso)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar o curso"
            })
        })
}

exports.buscarTodos = (req,res) => {
    const {page = 1} = req.query;
    const descricao = req.query.descricao

    var condition = descricao ? { descricao: { $regex: new RegExp(descricao), $options: "i" } } : {}

    //Verifica se foi passado a descrição na busca
    if (descricao) {
        var query = Curso.find(condition)
    }

    Curso.paginate(query,{page, limit: 500})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar os cursos"
        })
    })
}


exports.buscarUm = (req, res) => {
    const id = req.params.id

    Curso.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado curso com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a turma com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Curso.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar o curso com o id=${id}. `
                })
            } else res.send({ message: "Turma alterada com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar o curso com o id " + id
            })
        })
}

exports.apagar = (req, res) => {
    const id = req.params.id

    Curso.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Não foi possível encontrar e/ou deletar o curso com o id " + id
                })
            } else {
                res.send({
                    message: "Curso deletado com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível deletar o curso com o id " + id
            })
        })
}

exports.apagarTodos = (req, res) => {
    Curso.deleteMany({})
        .then(data => {
            res.send({
                message: `Todos os cursos foram deletados com sucesso`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao deletar todos os cursos"
            })
        })
}

exports.buscarAtivos = (req, res) => {
    Curso.find({ situacao: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar os cursos ativos"
            })
        })
}




