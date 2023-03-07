import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoute from "../core/routes/user.route";

export default class Server {
  public app: express.Application;
  public port = process.env.PORT || 3000;

  constructor() {
    // inicializa dependecia de express
    this.app = express();
  }

  public middleware() {
    this.app.use(express.static('public'));
  }

  public configBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }


  public configCors() {
    this.app.use(cors({ origin: true, credentials: true }));
  }

  public configRoutes() {
    this.app.use('/usuario', userRoute);
  }

  /**
   * Función que escucha las peticiones realizadas al puerto, y ejecuta un callback de tipo Funtion
   * @param callback
   */
  public start(callback: () => void) {
    this.app.listen(this.port, callback);
  }
}