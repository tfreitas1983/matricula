const db = require("../models")
const Turma = db.turmas


exports.cadastrar = (req, res) => {
    if (!req.body.descricao) {
        res.status(400).send({ message: "O nome da turma deve ser preenchida"})
        return
    }

    const turma = new Turma ({
        descricao: req.body.descricao,
        nivel: req.body.nivel,
        qtd: req.body.qtd,
        matriculas: req.body.matriculas,
        serie: req.body.serie,
        turno: req.body.turno,
        eja: req.body.eja,
        escola: req.body.escola,
        deficiente: req.body.deficiente,
        mental: req.body.mental,
        motora: req.body.motora,
        visual: req.body.visual,        
        cegueira: req.body.cegueira,
        baixaVisao: req.body.baixaVisao,
        multipla: req.body.multipla,
        surdoCegueira: req.body.surdoCegueira,
        superdotacao: req.body.superdotacao,
        auditiva: req.body.auditiva,
        fala: req.body.fala,   
        down: req.body.down, 
        autismo: req.body.autismo, 
        chkOutra: req.body.chkOutra,
        outra: req.body.outra,   
        selectedCurso: req.body.selectedCurso, 
        situacao: req.body.situacao ? req.body.situacao: true
    })

    turma
        .save(turma)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a turma"
            })
        })
}

exports.buscarTodos = (req,res) => {
    const {page = 1} = req.query;
    const descricao = req.query.descricao

    var condition = descricao ? { descricao: { $regex: new RegExp(descricao), $options: "i" } } : {}

    //Verifica se foi passado a descrição na busca
    if (descricao) {
        var query = Turma.find(condition)
    }

    Turma.paginate(query,{page, limit: 50000})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar as turmas"
        })
    })
}


exports.buscarUm = (req, res) => {
    const id = req.params.id

    Turma.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrada a turma com o id "+ id })
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

    Turma.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar a turma com o id=${id}. `
                })
            } else res.send({ message: "Turma alterada com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar a turma com o id " + id
            })
        })
}

exports.apagar = (req, res) => {
    const id = req.params.id

    Turma.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Não foi possível encontrar e/ou deletar a turma com o id " + id
                })
            } else {
                res.send({
                    message: "Turma deletada com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível deletar a turma com o id " + id
            })
        })
}

exports.apagarTodos = (req, res) => {
    Turma.deleteMany({})
        .then(data => {
            res.send({
                message: `Todas as turmas foram deletadas com sucesso`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao deletar todas as turmas"
            })
        })
}

exports.buscarAtivos = (req, res) => {
    Turma.find({ situacao: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar as turmas ativas"
            })
        })
}
