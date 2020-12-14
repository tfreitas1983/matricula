module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
    var schemaCursos = mongoose.Schema ({        
        descricao: String,
        situacao: Boolean        
    },
        { timestamps: true }
    )

    schemaCursos.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    
    schemaCursos.plugin(mongoosePaginate)
    const Cursos = mongoose.model("cursos", schemaCursos)    
    return Cursos
}