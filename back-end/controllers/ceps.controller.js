const db = require("../models")
const Cep = db.ceps

exports.buscarTodos = (req,res) => {
    const {page = 1} = req.query;
    const logradouro = req.query.logradouro
    const cep = req.query.cep

    var condition = logradouro ? { logradouro: { $regex: new RegExp(logradouro), $options: "i" } } : {}
    var conditionCep = cep ? { cep: { $regex: new RegExp(cep), $options: "i" } } : {}

    //Verifica se foi passado o logradouro na busca
    if (logradouro) {
        var query = Cep.find(condition)
    }

    if (cep) {
        var query = Cep.find(conditionCep)
    }

    Cep.paginate(query,{page, limit: 5000})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "um erro ocorreu ao buscar os CEPS"
        })
    })
}


exports.buscarUm = (req, res) => {
    const id = req.params.id

    Cep.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrada o CEP com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o CEP com o id=" +id })
        })
}


