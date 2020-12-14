module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
   // const AutoIncrement = require('mongoose-sequence')(mongoose)
    var schemaEscolas = mongoose.Schema ({        
        descricao: String, 
        cnpj: String,
        inep: String,
        logradouro: String,
        numero: String,
        complemento: String,
        bairro: String,
        cidade: String,
        uf: String,
        cep: String,
        telefone: String,
        email: String,
        eja: Boolean,
        subprefeitura: String,
        conveniada: Boolean,        
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
        outra: String,
        lat: String,
        long: String,
        situacao: Boolean,
        foto: {
            type: String,
            default: 'default.jpg'
        }
    },
        { timestamps: true }
    )

    schemaEscolas.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    
    schemaEscolas.plugin(mongoosePaginate)
   // schemaChamados.plugin(AutoIncrement, {num:'numchamado_seq', inc_field: 'numchamado'})
    const Escolas = mongoose.model("escolas", schemaEscolas)    
    return Escolas
}