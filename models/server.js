const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.middlewares();

        this.sockets();
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    sockets() {

        this.io.on('connection', socket => {

            console.log("Cliente conectado", socket.id);

            socket.on('disconnect', () => {
                console.log('Cliente desconectado',socket.id);
            });

            socket.on('enviar-mensaje', (payload) => {
                console.log("Mensaje recivido", payload);
            });

        });

    }


    listen() {
        this.server.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }

}


module.exports = Server;