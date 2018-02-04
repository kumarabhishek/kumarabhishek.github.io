if(process.argv.length === 3 && process.argv[2] === 'dev'){
    require('./dev')();
} else {
    require('./prd')();
}
