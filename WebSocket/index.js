const express=require('express')
const { WebSocketServer,WebSocket }=require('ws');
const app=express()
const httpServer=app.listen(8080)
const wss = new WebSocketServer({ server:httpServer });
app.get('/',(req,res)=>{
    res.send("ws")
})
wss.on('connection', function connection(socket) {
    console.log(socket)
    socket.on('error', console.error);
    socket.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        console.log(client)
        client.send(data, { binary: isBinary });
      }
    });
  });
});