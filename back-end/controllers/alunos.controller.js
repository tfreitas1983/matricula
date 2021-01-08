const db = require("../models")
const Aluno = db.alunos
const moment = require('moment')
const sgMail = require('@sendgrid/mail')

exports.cadastrar = (req, res) => {
    if (!req.body.nome) {
        res.status(400).send({ message: "O nome do(a) candidato(a) deve ser preenchido"})
        return
    }

    const aluno = new Aluno ({
        username: req.body.username,
        nome: req.body.nome,
        dtnascimento: req.body.dtnascimento,
        sexo: req.body.sexo,
        identificador: req.body.identificador,
        rg: req.body.rg,
        cpf: req.body.cpf,
        nis: req.body.nis,
        bolsafamilia: req.body.bolsafamilia,
        matricula: req.body.matricula,
        protocolo: moment().valueOf()+req.body.cpf_responsavel.substring(0,3),
        escola: req.body.escola,
        nivel: req.body.nivel,
        serie: req.body.serie,
        turma: req.body.turma,
        turno: req.body.turno,
        responsavel: req.body.responsavel,
        cpf_responsavel: req.body.cpf_responsavel,        
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        cep: req.body.cep,
        telefone: req.body.telefone,
        celular: req.body.celular,
        email: req.body.email,
        irmao: req.body.irmao,
        vulneravel: req.body.vulneravel,
        pontos: req.body.pontos,
        eja: req.body.eja,     
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
        status: req.body.status,
        situacao: req.body.situacao ? req.body.situacao: true,
        foto: req.body.foto
    })

    aluno
        .save(aluno)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao criar o(a) aluno(a)"
            })
        })
}

exports.email = (req, res) => {
    

    const id = req.params.id

    Aluno.findById(id, req.body)

    .then( (data) => {

        if (data.email === "") {
            res.status(400).send({ message: "O e-mail do(a) responsável deve ser preenchido"})
            return
        }

        require('dotenv').config()
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: data.email,
            from: {
                email: 'matriculabelfordroxo@gmail.com',
                name: 'Matrícula Belford Roxo'
            },
            subject: `Sua solicitação de pré-matrícula nº ${data.protocolo}`,
            text: `O chamado.`,
            html: `A sua solicitação para o(a) canditato(a) <strong>${data.nome}</strong> foi registrado sob protocolo <strong>${data.protocolo}</strong>.
            <p> Parabéns! Você efetuou a solicitação de pré-matrícula na rede municipal de Belford Roxo.
            Guarde esse protocolo com cuidado, pois será necessário para os demais passos na matrícula.
            Você pode conferir os demais dados preenchidos no portal na área de Acompanhamento da Solicitação</p>
            <p> <b> ${data.responsavel}</b> com CPF <b>${data.cpf_responsavel}</b> é responsável pelos dados preenchidos no portal de matrícula.</p>
            <p> ALUNO(A): <b>${data.nome}</b> </p>
            <p>Série: <b>${data.nivel} - ${data.serie} </b> </p>
            <p>Opção de escola: <b> ${data.escola} </b> </p> 
            <p> Fique atento ao seu e-mail, pois ao se tornar elegível para a vaga, o(a)
            responsável deve comparecer à escola no período informado no site da prefeitura de Belford Roxo junto
            com a documentação necessária, conforme descrito abaixo: </p>
            <p> - 02 (dois) retratos em tamanho 3x4;  </p>
            <p> - Cópia da Certidão de Registro Civil ou Cédula de Identidade do requerente, com os
            respectivos originais para conferência;  </p>
            <p> - Cópia da Identidade e do CPF do responsável ou do próprio requerente, quando
            maior ou emancipado, com os respectivos originais para conferência;  </p>
            <p> - Histórico Escolar original ou Declaração de Escolaridade, com validade de 30
            (trinta) dias, onde deverão constar o(a) último(a) ano/série escolar concluído(a) e o
            ano de conclusão;  </p>
            <p> - Comprovante de residência atualizado;  </p>
            <p> - Caderneta de vacinação do(a) candidato(a) menor de 07 (sete) anos de idade;  </p>
            <p> - Cartão do Sistema Único de Saúde;  </p>
            <p> - Cartão do bolsa família, se possuir;  </p>
            <p> - Grupo sanguíneo e Fator RH do(a) candidato(a);  </p>
            <p> - Pasta Modelo 17 </p>                
            <p> - Caso o(a) canditato(a) possua alguma deficiência será necessário levar o laudo
            médico para comprovar tal deficiência na escola desejada. 
            Se caso não houver deficiência comprovada, o(a) responsável deverá comparecer outra vez na escola.</p>`,
        }
        sgMail.send(msg)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Um erro ocorreu ao enviar o e-mail"
        })
    }) 
}

exports.emailAprovado = (req, res) => {
    

    const id = req.params.id

    Aluno.findById(id, req.body)

    .then( (data) => {

        if (data.email === "") {
            res.status(400).send({ message: "O e-mail do(a) responsável deve ser preenchido"})
            return
        }

        require('dotenv').config()
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: data.email,
            from: {
                email: 'matriculabelfordroxo@gmail.com',
                name: 'Matrícula Belford Roxo'
            },
            subject: `Sua solicitação de pré-matrícula nº ${data.protocolo} foi aprovada!`,
            text: `O chamado.`,
            html: `A sua solicitação para o(a) canditato(a) <strong>${data.nome}</strong> sob protocolo <strong>${data.protocolo}</strong> foi aprovada.
            <p> Parabéns! Você foi aprovado na rede municipal de Belford Roxo.
            Guarde esse protocolo com cuidado, pois será necessário para os demais passos na matrícula.
            Você pode conferir os demais dados preenchidos no portal na área de Acompanhamento da Solicitação</p>
            <p> <b> ${data.responsavel}</b> com CPF <b>${data.cpf_responsavel}</b> é responsável pelos dados preenchidos no portal de matrícula.</p>
            <p> ALUNO(A): <b>${data.nome}</b> </p>
            <p>Série: <b>${data.nivel} - ${data.serie} </b> </p>
            <p>Opção de escola: <b> ${data.escola} </b> </p> 
            <p> Agora o(a) responsável deve comparecer à escola solicitada, no período informado no site da prefeitura,
            com a documentação necessária, conforme descrito abaixo: </p>
            <p> - 02 (dois) retratos em tamanho 3x4;  </p>
            <p> - Cópia da Certidão de Registro Civil ou Cédula de Identidade do requerente, com os
            respectivos originais para conferência;  </p>
            <p> - Cópia da Identidade e do CPF do responsável ou do próprio requerente, quando
            maior ou emancipado, com os respectivos originais para conferência;  </p>
            <p> - Histórico Escolar original ou Declaração de Escolaridade, com validade de 30
            (trinta) dias, onde deverão constar o(a) último(a) ano/série escolar concluído(a) e o
            ano de conclusão;  </p>
            <p> - Comprovante de residência atualizado;  </p>
            <p> - Caderneta de vacinação do(a) candidato(a) menor de 07 (sete) anos de idade;  </p>
            <p> - Cartão do Sistema Único de Saúde;  </p>
            <p> - Cartão do bolsa família, se possuir;  </p>
            <p> - Grupo sanguíneo e Fator RH do(a) candidato(a);  </p>
            <p> - Pasta Modelo 17 </p>                
            <p> - Caso o(a) canditato(a) possua alguma deficiência será necessário levar o laudo
            médico para comprovar tal deficiência na escola desejada. 
            Se caso não houver deficiência comprovada, o(a) responsável deverá comparecer outra vez na escola.</p>`,
        }
        sgMail.send(msg)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Um erro ocorreu ao enviar o e-mail"
        })
    }) 
}

exports.emailReprovado = (req, res) => {
    

    const id = req.params.id

    Aluno.findById(id, req.body)

    .then( (data) => {

        if (data.email === "") {
            res.status(400).send({ message: "O e-mail do(a) responsável deve ser preenchido"})
            return
        }

        require('dotenv').config()
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: data.email,
            from: {
                email: 'matriculabelfordroxo@gmail.com',
                name: 'Matrícula Belford Roxo'
            },
            subject: `Sua solicitação de pré-matrícula nº ${data.protocolo} não foi aceita!`,
            text: `O chamado.`,
            html: `A sua solicitação para o(a) canditato(a) <strong>${data.nome}</strong> foi registrado sob protocolo <strong>${data.protocolo}</strong>.
            <p> Parabéns! Você efetuou a solicitação de pré-matrícula na rede municipal de Belford Roxo.
            Guarde esse protocolo com cuidado, pois será necessário para os demais passos na matrícula.
            Você pode conferir os demais dados preenchidos no portal na área de Acompanhamento da Solicitação</p>
            <p> <b> ${data.responsavel}</b> com CPF <b>${data.cpf_responsavel}</b> é responsável pelos dados preenchidos no portal de matrícula.</p>
            <p> ALUNO(A): <b>${data.nome}</b> </p>
            <p>Série: <b>${data.nivel} - ${data.serie} </b> </p>
            <p>Opção de escola: <b> ${data.escola} </b> </p> 
            <p> Fique atento ao seu e-mail, pois ao se tornar elegível para a vaga, o(a)
            responsável deve comparecer à escola no período informado no próximo e-mail junto
            com a documentação necessária, conforme descrito abaixo: </p>
            <p> - 02 (dois) retratos em tamanho 3x4;  </p>
            <p> - Cópia da Certidão de Registro Civil ou Cédula de Identidade do requerente, com os
            respectivos originais para conferência;  </p>
            <p> - Cópia da Identidade e do CPF do responsável ou do próprio requerente, quando
            maior ou emancipado, com os respectivos originais para conferência;  </p>
            <p> - Histórico Escolar original ou Declaração de Escolaridade, com validade de 30
            (trinta) dias, onde deverão constar o(a) último(a) ano/série escolar concluído(a) e o
            ano de conclusão;  </p>
            <p> - Comprovante de residência atualizado;  </p>
            <p> - Caderneta de vacinação do(a) candidato(a) menor de 07 (sete) anos de idade;  </p>
            <p> - Cartão do Sistema Único de Saúde;  </p>
            <p> - Cartão do bolsa família, se possuir;  </p>
            <p> - Grupo sanguíneo e Fator RH do(a) candidato(a);  </p>
            <p> - Pasta Modelo 17 </p>                
            <p> - Caso o(a) canditato(a) possua alguma deficiência será necessário levar o laudo
            médico para comprovar tal deficiência na escola desejada. 
            Se caso não houver deficiência comprovada, o(a) responsável deverá comparecer outra vez na escola.</p>`,
        }
        sgMail.send(msg)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Um erro ocorreu ao enviar o e-mail"
        })
    }) 
}


exports.buscarTodos = (req,res) => {
    const {page = 1} = req.query
    const {nome, escola, status, cpf_responsavel, serie, turno, turma} = req.query 

    var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {}    
    var condEscola = escola ? {escola : { $regex: new RegExp(escola), $options: "i" } } : {}
    var condStatus = status ? {status: { $regex: new RegExp(status), $options: "i" }  } : {}
    var condCPF = cpf_responsavel ? {cpf_responsavel: cpf_responsavel } : {}
    var condSerie = serie ? {serie: { $regex: new RegExp(serie), $options: "i" }  } : {}
    var condTurno = turno ? {turno: { $regex: new RegExp(turno), $options: "i" }  } : {}
    var condTurma = turma ? {turma: { $regex: new RegExp(turma), $options: "i" }  } : {}

    //Verifica se foi passada a data de nascimento
    let dtnascimento = null
    let dt_final = null
    if(req.query.dtnascimento) {
        dtnascimento = new Date(req.query.dtnascimento)
        dt_final = new Date(moment(dtnascimento).add(1,'days'))
    }

    //Verifica se não possui filtro
    if (!nome && !escola && !dtnascimento && !cpf_responsavel && !status && !serie && !turno && !turma) {
        var query = Aluno.find().sort({pontos: -1})
    }


    //Verifica se foi passado o nome na busca
    if (nome) {
        var query = Aluno.find(condition).sort({pontos: -1})
    }

    //Verifica se foi passada a data de nascimento
    if (dtnascimento) {
        var query = Aluno.find({dtnascimento: {$gte: dtnascimento, $lt: dt_final }}).sort({pontos: -1})
    } 
    
    if (escola) {
        var query = Aluno.find(condEscola).sort({pontos: -1})
    }

    if (status) {
        var query = Aluno.find(condStatus).sort({pontos: -1})
    }

    if (cpf_responsavel) {
        var query = Aluno.find(condCPF).sort({pontos: -1})
    }

    if (serie) {
        var query = Aluno.find(condSerie).sort({pontos: -1})
    }

    if (turno) {
        var query = Aluno.find(condTurno).sort({pontos: -1})
    }

    if (turma) {
        var query = Aluno.find(condTurma).sort({pontos: -1})
    }

    if (nome && dtnascimento) {
        var query = Aluno.find({$and:[condition, {dtnascimento: {$gte: dtnascimento, $lt: dt_final} } ]}).sort({pontos: -1})
    }

    if (nome && escola) {
        var query = Aluno.find({$and:[condition, condEscola]}).sort({pontos: -1})
    }

    if (escola && turno && serie && turma) {
        var query = Aluno.find({$and:[condEscola, condTurno, condSerie, condTurma]}).sort({pontos: -1})
    }

    if (escola && serie && turno && !turma) {
        var query = Aluno.find({$and:[condEscola, condTurno, condSerie]}).sort({pontos: -1})
    }

    if (escola && turno && turma && !serie) {
        var query = Aluno.find({$and:[condEscola, condTurno, condTurma]}).sort({pontos: -1})
    }

    if (serie && turno && turma && !escola) {
        var query = Aluno.find({$and:[condSerie, condTurno, condTurma]}).sort({pontos: -1})
    }

    if (escola && turno && !serie && !turma) {
        var query = Aluno.find({$and:[condEscola, condTurno]}).sort({pontos: -1})
    }    
    if (escola && turma && !turno && !serie) {
        var query = Aluno.find({$and:[condEscola, condTurma]}).sort({pontos: -1})
    }

    if (escola && serie && !turno && !turma) {
        var query = Aluno.find({$and:[condEscola, condSerie]}).sort({pontos: -1})
    }



    Aluno.paginate(query,{page, limit: 50000})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "Um erro ocorreu ao buscar os(as) alunos(as)"
        })
    })
}


exports.buscarUm = (req, res) => {
    const id = req.params.id

    Aluno.findById(id)
        .then(data => {
            if (!data) 
                res.status(404).send({ message: "Não foi encontrado(a) o(a) aluno(a) com o id "+ id })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Erro ao buscar o(a) aluno(a) com o id=" +id })
        })
}

exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }

    const id = req.params.id

    Aluno.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar e/ou alterar o(a) aluno(a) com o id=${id}. `
                })
            } else res.send({ message: "Aluno(a) alterado(a) com sucesso" })
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao alterar o(a) aluno(a) com o id " + id
            })
        })
}

exports.apagar = (req, res) => {
    const id = req.params.id

    Aluno.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Não foi possível encontrar e/ou deletar o(a) aluno(a) com o id " + id
                })
            } else {
                res.send({
                    message: "Aluno(a) deletado com sucesso!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível deletar o(a) aluno(a) com o id " + id
            })
        })
}

exports.apagarTodos = (req, res) => {
    Aluno.deleteMany({})
        .then(data => {
            res.send({
                message: `Alunos(as) foram deletados(as) com sucesso`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocorreu um erro ao deletar todos(as) alunos(as)"
            })
        })
}

exports.buscarAtivos = (req, res) => {
    Aluno.find({ situacao: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Um erro ocorreu ao buscar os(as) alunos(as) ativas"
            })
        })
}