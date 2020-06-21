const Seller = require('../models/Seller');
const { response } = require('express');
const sellerController = {};


sellerController.getSellers = async (req,res,next) => {
    const allSellers = await Seller.find()
        .catch( err => next(err));
    res.status(200).json(allSellers);
}

sellerController.postSeller = async (req,res,next) => {
    //controlo que existan los datos obligatorios
    if (req.body.fullName && req.body.dni){

        const { fullName, dni, birthDate } = req.body;
        // controlo existencia de datos obligatorios mas especificamente
        if (fullName.firstName && fullName.lastName){

            const newSeller = new Seller({
                fullName, dni, birthDate
            })
            await newSeller.save()
                .catch( err => next(err) )

            res.status(200).json(newSeller);

        }else{
            res.send('Faltan parametros obligatorios.');
        }
    }else{
        res.send('Faltan parametros obligatorios.');
    }
    
}

sellerController.getSeller = async (req, res, next) => {
    const sell = await Seller.findById(req.params.id)
        .catch( err => next(err));
    res.status(200).json(sell);
}

sellerController.putSeller = async (req, res, next) => {
    const { fullName, dni, birthDate } = req.body;

    await Seller.findByIdAndUpdate(req.params.id, { fullName, dni, birthDate })
        .then( async () => {
            //si la actualizacion fue exitosa envia en formato json el documento actualizado
            const sell = await Seller.findById(req.params.id)
                .catch( err => next(err));
            res.status(200).json(sell);
        })
        .catch( err => next(err));
    
}

module.exports = sellerController;

