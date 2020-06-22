const Schema = require('mongoose').Schema;
const model = require('mongoose').model;


const SellerSchema = new Schema({
    fullName: {
        firstName: { type: String, require:true, trim:true},
        lastName: { type: String, require:true, trim:true}
    },
    dni: {
        type: String, require:true, trim:true, maxlength:10,
    },
    imgPath: String,
    birthDate: String,
    finances: {
        positive: { type: Number, default: 0.0},
        negative: { type: Number, default: 0.0}
    }
})



module.exports = model('Seller',SellerSchema)

