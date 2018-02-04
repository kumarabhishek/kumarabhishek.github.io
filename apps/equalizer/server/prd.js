const
app = require('express')(),
path = require('path'),
serveStatic = require('serve-static'),
compression = require('compression');

app.set('port', (process.env.PORT || 3000));

app.use(compression());
app.use(serveStatic(path.join(__dirname, '../client/build')));

app.post('/dummy', function(req, res){
	res.json({r: 0, data: {}});
});

app.get(['*'], function(req, res){
	//console.log(req);
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});





module.exports = () => {
    console.log('Production Server');
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });
}