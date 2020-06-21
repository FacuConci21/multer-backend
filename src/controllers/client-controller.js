const Client = require('../models/Client');
const clientsController = {};


clientsController.getClients = async (req,res) => { 
    const clients = await Client.find();
    res.status(200).json(clients);
        
}

clientsController.postClient =  async (req,res, next) => {
    if(req.body.fullName && req.body.dni)
    {
        const { fullName, dni, birthDate } = req.body;
        const anotherClient = new Client({
            fullName, dni, birthDate
        });
        await anotherClient.save()
            .then(()=> res.status(200).json(anotherClient) )
            .catch( err => next(err) );
    }else{
        res.json({ error:"faltan datos obligatorios." });
    }
}

clientsController.getClientById = async (req, res, next) => {
    const client = await Client.findById(req.params.id)
        .catch( err => next(err));
    res.status(200).json(client);
}

clientsController.putClient = async (req, res, next) => {
    const { fullName, dni, birthDate } = req.body;
    await Client.findByIdAndUpdate(req.params.id,{
        fullName, dni, birthDate
    })
    .then( async () => {
        //si la actualizacion fue exitosa envia en formato json el documento actualizado
        const client = await Client.findById(req.params.id)
        .catch( err => next(err));
        res.status(200).json(client);
    })
    .catch( err => next(err));
}

module.exports = clientsController;

