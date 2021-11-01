const express = require("express");
const  cors = require('cors');
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';


    // Conectar a base de datos.
    this.conectarDB();
    // Middlewares
    this.middlewares();
    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    //Directorio público
    this.app.use(express.static("public"));
    //CORS
    this.app.use( cors() );

    //Lectura y parseo del body del post
    this.app.use(express.json());


  }
 
  async conectarDB(){
      await dbConnection();
  }
  routes() {
    this.app.use(this.usuariosPath, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto: " + process.env.PORT);
    });
  }
}

module.exports = Server;
