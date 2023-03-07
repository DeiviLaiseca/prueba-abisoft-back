import mongoose, { ConnectOptions } from "mongoose";
import { environment } from "./environments/environments";
import Server from "./server/server.class";

const server = new Server();

server.middleware();

//----------------------MIDLEWARE BODY PARSER-----------------------//

server.configBodyParser();

//----------------------CONFIGURACIÓN DE CORS----------------------//

server.configCors();
//----------------------RUTAS DE LA APLICACIÓN-----------------------//

server.configRoutes();

console.clear();

//-------------------------CONEXIÓN MONGO DB--------------------------//

mongoose.connect(
  environment.mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions,
  (err) => {
    if (err) {
      console.log('Error de conexión BD');
    };

    console.log('DB conected...');
  }
);

//------------------------LEVANTA EL SERVIDOR-------------------------//

server.start(() => {
  console.log('Server RUN in ', server.port);
});