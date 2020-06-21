const mongoose = require('mongoose');

const URI = 'mongodb://localhost/e-comerce';

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then( e => console.log('DB is connected') )
    .catch( err => console.log(`Error ocurred:\n ${err}`) );