const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const SingleBuySchema = new Schema({
    productName: { type: String, trim:true, require },
    cuantity: { type: Number, require },
    price: { type: Number, require}
},{
    timestamps: true
})

const ClientSchema = new Schema({
    fullName: {
        firstName: { type: String, require:true, trim:true},
        lastName: { type: String, require:true, trim:true}
    },
    dni: {
        type: String, require:true, trim:true, maxlength:10,
    },
    imgPath: String,
    birthDate: String,
    carrito: [SingleBuySchema],
},{
    timestamps: true
})


module.exports = model('Client', ClientSchema);

