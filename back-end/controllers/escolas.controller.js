const db = require("../models")
const Escola = db.escolas
const Files = db.files
const moment = require('moment')

exports.cadastrar = (req, res) => {
    if (!req.body.descricao) {
        res.status(400).send({ message: "O nome da escola deve ser preenchida"})
        return
    }

    const escola = new Escola ({
        descricao: req.body.descricao,
        cnpj: req.body.cnpj,
        inep: req.body.inep,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        cep: req.body.cep,
        telefone: req.body.telefone,
        email: req.body.email,
        eja: req.body.eja,
        subprefeitura: req.body.subprefeitura,
        conveniada: req.body.conveniada,        
        deficiente: req.body.deficiente,
        mental: req.body.mental,
        auditiva: req.body.auditiva,
        fala: req.body.fala,
        motora: req.body.motora,
        visual: req.body.visual,        
        cegueira: req.body.cegueira,
        baixaVisao: req.body.baixaVisao,
        multipla: req.body.multipla,
        surdoCegueira: req.body.surdoCegueira,
        superdotacao: req.body.superdotacao,
        down: req.body.down,
        autismo: req.body.autismo,
        chkOutra: req.body.chkOutra,
        outra: req.body.outra,
        lat: req.body.lat,
        long: req.body.long,    
        situacao: req.body.situacao ? req.body.situacao: true,
        foto: req.body.foto
    })

    escola
        .save(escola)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a escola"
            })
        })
}

exports.buscarTodos = (req,res) => {
    const {page = 1} = req.query;
    const descricao = req.query.descricao

    var condition = descricao ? { descricao: { $regex: new RegExp(descricao), $options: "i" } } : {}

    //Verifica se foi passado a descrição na busca
    if (descricao) {
        var query = Escola.find(condition)
    }

    Escola.paginate(query,{page, limit: 5000})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar as escolas"
        })
    })
}


exports.buscarUm = (req, res) => {
    const id = req.params.id

    Escola.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrada a escola com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar a escola com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Escola.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar a escola com o id=${id}. `
                })
            } else res.send({ message: "Chamado alterado com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar a escola com o id " + id
            })
        })
}

exports.apagar = (req, res) => {
    const id = req.params.id

    Escola.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Não foi possível encontrar e/ou deletar a escola com o id " + id
                })
            } else {
                res.send({
                    message: "Chamado deletado com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível deletar a escola com o id " + id
            })
        })
}

exports.apagarTodos = (req, res) => {
    Escola.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} escolas foram deletados com sucesso`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao deletar todas as escolas"
            })
        })
}

exports.buscarAtivos = (req, res) => {
    Escola.find({ situacao: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar as escolas ativas"
            })
        })
}

exports.buscarImagem = (req, res) => {
    const id = req.params.id

    Files.findById(id)   
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar a imagem"
            })
        })
}

exports.buscarImagens = (req, res) => {   

    Files.find()   
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar as imagens"
            })
        })
}

exports.cadastrarImagem = (req, res) => {
    const { originalname: original, filename: foto, size, location: url = "" } = req.file
    if (!foto) {
        res.status(400).send({ message: "A imagem deve ser enviada"})
        return
    }

    const file = new Files ({
       original,
       foto,
       size, 
       url
    })
    file    
        .save(file)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar a imagem"
            })
        })
}





