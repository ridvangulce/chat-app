const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

const { Server } = require("socket.io")

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {

    console.log(`User Connected: ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User With ID : ${socket.id} joined room : ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
        console.log(data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
});




server.listen(3001, () => {
    console.log("SERVER RUNNING");
})



/* ****************************************************************************************************************** */




// const app = require("express")();
// const http = require("http").Server(app);
// const io = require("socket.io");
// const cors =  require("cors");


// const Messages = require("./lib/Messages");
// app.use(cors());
// app.get("/",(req,res)=>{
//     res.end("Merhaba Socket");
// });
// io.on("connection",(socket)=>{
//     console.log("user connected");
//     Messages.list((data)=>{
//         console.log(data);
//         socket.emit("message-list",data);
//     });
//     socket.on("new-message",(message)=>{
//         console.log(message);
//         Messages.upsert({message});

//         socket.broadcast.emit("receive-message",message);
//     })
//     socket.on("disconnect",()=>console.log("user disconnected"));

// }); 

// http.listen(process.env.PORT || "3001",()=>{
//     console.log("Listening On : 3001");
// })

// application