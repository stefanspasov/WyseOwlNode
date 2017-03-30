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

dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
});    

dispatcher.onGet("/page2", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page TWO');
});


// START THE SERVER
// =============================================================================
http.createServer(handleRequest).listen(port);
