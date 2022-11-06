import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import errorHandler from './middleware/errorHandler.middleware';
import { errors } from 'celebrate';
import Logging from './library/Logging';
// import { limiter } from './middleware/limiter.middleware';
import helmet from 'helmet';
import NotFoundError from './errors/NotFoundError';
import * as logger from './middleware/logger.middleware';
import Controller from './interfaces/controller.interface';
const cors = require('cors');

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeRequestLogging();
        this.initializeControllers(controllers);
        this.initializeErrorLogging();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.options('*', cors());
        this.app.use(helmet());
        // this.app.use(limiter);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeErrorHandling() {
        this.app.use(errors());
        this.app.use(errorHandler);
    }

    private initializeErrorLogging() {
        this.app.use(logger.errorLogger);
    }

    private initializeRequestLogging() {
        this.app.use(logger.requestLogger);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller: Controller) => {
            this.app.use('/', controller.router);
        });

        // catch 404 and forward to error handler
        this.app.use('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            next(new NotFoundError("The requested resource doesn't exist"));
        });
    }

    public connectToDatabaseAndListen() {
        mongoose
            .connect(config.db)
            .then(() => {
                Logging.info('Connected to MongoDB at: ' + config.db);
                this.listen();
            })
            .catch((err) => {
                Logging.error('Unable to connect: ');
                console.log(err);
            });
    }

    private listen() {
        this.app.listen(this.port, () => {
            Logging.info(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
