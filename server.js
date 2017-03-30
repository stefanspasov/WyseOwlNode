// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var http = require('http');
var HttpDispatcher = require('httpdispatcher');
var dispatcher     = new HttpDispatcher();
var port = process.env.PORT || 8081;        // set our port

function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('It works');
});    

dispatcher.onPost("/calc", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
	var parsed = JSON.parse(req.body);
    res.end(parsed.me);
});


// START THE SERVER
// =============================================================================
http.createServer(handleRequest).listen(port);
