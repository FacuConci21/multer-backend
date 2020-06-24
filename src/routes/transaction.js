const Client = require('../models/Client');
const Products = require('../models/Product');
const mongoose = require('mongoose');
const router = require('express').Router();

/*
    ENDPOINT: http://localhost:<PORT>/api/venta
    
    <PORT>: el puerto donde inicies tu servidor;
*/ 


// Funcion asincrona donde se produce todo el proceso de transaccion.
async function transaction(idClient,idProduct, cant){
    
    /* Mongoose, inicia una sesion de cliente para poder iniciar una transaccion */
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Trae mediante una consulta el producto y el cliente en cuestion.
        const client = await Client.findById(idClient);
        const product = await Products.findById(idProduct);
        // se muestran los datos en consola para comprobar la consulta.
        // console.log(cant);console.log(client);console.log(product);console.log(`idproduct:${idProduct}`); //descomenta esto si te hace falta.
        
        if(!client || !product){ 
            // Si no se consiguio algun documento se lanza un error.
            throw Error('Hubo un error en la consulta de los datos.') 
        }else if(product.abailables < cant){
            // Si la cantidad que solicita el cliente es mayor a la disponible, se laza un error.
            throw Error('Cantidad de productos insuficientes');
        }else{
            // Todo salio correcto, hasta ahora...
            
            // Añade una compra individual al carrito de compras del cliente.
             const singlebuy = {
                productName: product.name,
                cuantity: cant,
                price: product.price
            }
            client.carrito.push(singlebuy);
            
            // Calcula cuantos productos se retiraron
            const upAbailables = product.abailables - cant; 
            
            // Guarda el subdocumento de compra actualizando el documento del cliente.
            await client.save()
            .catch( err => {throw Error(err);})

            // Gctualiza la disponibilidad del producto restandole lo que solicito el cliente.
            await Products.updateOne({_id:product.id},{abailables:upAbailables})
            .catch( err => {throw Error(err);})
            
            
        }

        /* process.on() para capturar errores imprevistos y desconocidos ... si si, para la compu
         tambien hay de esos jaja. */
        process.on('uncaughtException', err => {
            throw Error(err);
            });
        
        // Hace commit.
        await session.commitTransaction();
        console.log('commit');

    } catch (error) {
        /*
            En el codigo de arriba me encargo de arrojar cualquier error que se produzca y
            si se produce un error que no se pueda capturar puse el process.on().

            El process.on() es un capturador de eventos, si no puede capturar el evento del error producido 
            se podria agregar un process.on('unhandledException'), de lo contrario habria que cambiar el codigo.

            Ante cualquier error producido, se aborta la transaccion y se anulan los cambios producidos.
            Ninguno de esos cambios se guardan.
        */
        await session.abortTransaction();
        /*
            Aunque parezca redundante este console.log(), lo puse porque en un error, de tipo "unhandled" digamosle,
            no salia este mensaje, salia el mensaje de <commit>, pero realmente nunca habia hecho commit ... realmente
            habia abortado.

            El mensaje <abort> no salio porque la exepcion "unhandled" no es un error si no un evento y como no es un
            error, entonces no hay error y no se aborta la transaccion.

            Si queres leer mas respecto al process.on() visita: https://nodejs.org/dist/latest-v12.x/docs/api/process.html#process_event_uncaughtexception
        */
        console.log('abort');
        // Lanza el error que se recibe, no lo muestra por pantalla.
        throw error;
    }finally{

        // Finalmente, en cualquiera de los casos, se cierra la sesion de cliente y se informa por la consola.
        session.endSession();
        console.log('session finished');
    }
}

router.route('/')
    .post( (req, res, next) => {
        transaction(req.body.idclient, req.body.idproduct, req.body.cant)
        .then(()=>{
            res.status(200).json({ transaction: true });
        })
        .catch( err => next(err))
    })

/* 
    Esta es la primer transaccion que programo para mongodb, estoy seguro que la implementacion no es la mejor
    para un caso de la vida real o para un entorno de produccion, pero almenos me ocupe de que funcione.

    No implico pagos, ni calculos de saldos del cliente o precios, descuentos, etc. Eso lo guardo para problemas mas
    complejos y para mi "yo" del futuro.
*/

module.exports = router;