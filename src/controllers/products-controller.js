const Product =  require('../models/Product');
const productController = {};

productController.getProducts = async (req, res, next) => {
    const allProducts = await Product.find()
        .catch( err => next(err))
    res.status(200).json(allProducts);
}

productController.getProduct = async (req, res, next) => {
    const aProduct = await Product.find({_id:req.params.id})
        .catch( err => next(err))
    res.status(200).json(aProduct);
}

productController.postProducts = async (req, res, next) => {
    if(req.body.name && req.body.description && req.body.price && req.body.sellerId){
        const { name, description, price, sellerId } = req.body;
        const newProduct = new Product({ name, description, price, sellerId });

        if (req.body.abailables){ newProduct.abailables = req.body.abailables}
        await newProduct.save()
            .then( () => res.status(200).json({_id:newProduct._id}))
            .catch( err => next(err))
    }else{
        next('Faltan datos obligatorios.');
    }
}

productController.putProducts = async (req, res, next) => {
    await Product.findByIdAndUpdate({_id:req.params.id},{...req.body})
        .catch( err => next(err))
    res.status(200).json({ message:'updated' });
}

productController.deleteProducts = async (req, res, next) => {
    await Product.findByIdAndDelete({_id:req.params.id})
        .catch( err => next(err))
    res.status(200).json({ message:'deleted' });
}

module.exports = productController;