const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const SingleBuySchema = new Schema({
    productName: { type: String, trim:true, require: true },
    cuantity: { type: Number, require: true },
    price: { type: Number, require: true}
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


module.exports = model('SingleBuy', SingleBuySchema);// No estoy seguro de que esta linea sea necesaria pero la dejo
module.exports = model('Client', ClientSchema);

