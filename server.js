var server = require("zzz").createServer();

server.put("/session/:bucket", function(request, response, params) {

});

server.get("/session/:bucket/:sessionId", function(request, response, params) {
response.end("Bucket:" + params.bucket + "-SessionID:" + params.sessionId);
});

server.listen(8385);