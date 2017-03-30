// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

var port = process.env.PORT || 8081;        // set our port
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Get request incoming.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8081/api)
router.get('/', function(req, res) {
    res.json({ message: 'it works!' });   
});

router.route('/calc/:calc_1/:calc_2')
.get(function(req, res) {
       res.json("hello" + req.params.calc_1 + req.params.calc_2);
    });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
//app.listen(port);
//console.log('Magic happens on port ' + port);