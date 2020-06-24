const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

// inititializations
const app = express();
const upload = multer({ //aun falta configurar multer.
    dest: path.join(__dirname,'uploads'),
    filename: 'backend-file-' + Date.now() 
});



// settings
app.set('port', process.env.PORT || 3100);



// middlewares
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


// routes
app.use('/api/clients', require('./routes/clients'));
app.use('/api/sellers', require('./routes/sellers'));
app.use('/api/products', require('./routes/products'));
app.use('/api/venta',require('./routes/transaction'));

// static files



module.exports = app;

