module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
    var uniqueValidator = require('mongoose-unique-validator')
    var schemaAlunos = mongoose.Schema ({        
       
       username: String,
        // Dados do responsável
       
        responsavel: String,
        cpf_responsavel: String,
        logradouro: String,
        numero: String,
        complemento: String,
        bairro: String,
        cidade: String,
        uf: String,
        cep: String,
        lat: Number,
        long: Number,
        telefone: String,
        celular: String,
        email: String,
        identificador: {type: Number, required: true, unique: true},

        //Dados do candidato
        nome: String, 
        dtnascimento: { type: Date }, 
        sexo: String,
        matricula: Number,
        protocolo: Number,
        nivel: String,
        serie: String,
        turma: String,
        turno: String,
        eja: Boolean,
        irmao: Boolean,
        vulneravel: Boolean,
        pontos: Number,
        cpf: String,
        rg: String,
        nis: String,
        bolsafamilia: String,
        escola: String,
        selectedCurso: String,
        situacao: Boolean ,
        status: String,

        //Se deficiente
        deficiente: String,
        mental: Boolean,
        auditiva: Boolean,
        fala: Boolean,
        motora: Boolean,
        visual: Boolean,
        cegueira: Boolean,
        baixaVisao: Boolean,
        multipla: Boolean,
        surdoCegueira: Boolean,
        superdotacao: Boolean,
        down: Boolean,
        autismo: Boolean,
        chkOutra: Boolean,
        outra: String                
               
    },
        { timestamps: true }
    )

    schemaAlunos.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    schemaAlunos.plugin(uniqueValidator)
    schemaAlunos.plugin(mongoosePaginate)
    const Alunos = mongoose.model("alunos", schemaAlunos)    
    return Alunos
}