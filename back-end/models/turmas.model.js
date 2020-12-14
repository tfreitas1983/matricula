module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
    var schemaTurmas = mongoose.Schema ({        
        descricao: String, 
        nivel: String,
        qtd: Number,
        matriculas: Number,
        serie: String,
        turno: String,
        eja: Boolean,
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
        escola: String,
        selectedCurso: String,
        situacao: Boolean        
    },
        { timestamps: true }
    )

    schemaTurmas.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    
    schemaTurmas.plugin(mongoosePaginate)
    const Turmas = mongoose.model("turmas", schemaTurmas)    
    return Turmas
}