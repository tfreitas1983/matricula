module.exports = mongoose => {
    const mongoosePaginate = require('mongoose-paginate')
    var schemaSubPrefeituras = mongoose.Schema ({        
        descricao: String,
        situacao: Boolean        
    },
        { timestamps: true }
    )

    schemaSubPrefeituras.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    
    schemaSubPrefeituras.plugin(mongoosePaginate)
    const SubPrefeituras = mongoose.model("subprefeituras", schemaSubPrefeituras)    
    return SubPrefeituras
}