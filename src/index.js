
if (process.env.NODE_ENV==="production"){
    console.log('__env__::production');
}else{
    console.log('__env__::development');
}

const app = require('./app');

require('./database');

async function main(){
    await app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}`);
}

main();