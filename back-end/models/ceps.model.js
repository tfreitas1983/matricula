module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
    var schemaCeps = mongoose.Schema ({        
        logradouro: String,
        complemento: String,
        bairro: String,
        cidade: String,
        uf: String,
        cep: String       
    },
        { timestamps: true }
    )

    schemaCeps.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    
    schemaCeps.plugin(mongoosePaginate)
    const Ceps = mongoose.model("ceps", schemaCeps)    
    return Ceps
}