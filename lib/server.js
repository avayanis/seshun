var server = require("zzz").createServer();
var uuid = require("node-uuid");

server.put("/session/:bucket", function(request, response, params) {
    response.end(params);
});

server.get("/session/:bucket/:sessionId", function(request, response, params) {
    console.log(params);
    response.end("Bucket:" + params.bucket + " SessionID:" + params.sessionId);
});

server.get("/session/settings", function(request, response, params) {
    response.end("config.yml spewwwww!");
});

server.get("/uuid/v1", function(request, response, params){
    response.end(uuid.v1());
});

server.get("/uuid/v4", function(request, response, params){
    response.end(uuid.v4());
});


server.listen(8385);