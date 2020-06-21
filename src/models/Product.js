const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const model = require('mongoose').model;


const ProductSchema = new Schema({
    name: { type: String, maxlength: 50, required: true},
    description: {type: String, maxlength: 200, required: true},
    price: {type: Number, required:true, },
    sellerId: {type: String, required:true},
    imgPath: String,
    abailables: {type:Number, default: 1}
})

ProductSchema.methods.getAbailability = function (callback){
    return mongoose.model('Product').find({_id:this._id},{abailables: 1});
}

module.exports = model('Product', ProductSchema);
