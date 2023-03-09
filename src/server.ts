import * as https from 'https';
import * as fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDatabase from './config/connectDatabase';
import redirectHttp from './middleware/redirectHttp';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';
import templateRoutes from "./routes/templateRoutes";

/**
 * Server class to handle server configuration and routes
 * This class is used to start the server
 */
class Server {
    private app: express.Application;
    private readonly port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || "443", 10);

        this.config();
        this.routes();
    }

    private config(): void {
        // Load env vars
        dotenv.config();

        // Connect to database
        connectDatabase();

        // Dev logging middleware
        if (process.env.NODE_ENV === 'development') {
            this.app.use(morgan('dev'));
        }

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(redirectHttp);
        this.app.use('/docs', express.static('docs')); // Serve docs folder
    }

    private routes(): void {
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/tickets', ticketRoutes);
        this.app.use('/api/templates', templateRoutes);

        this.app.get('/', (req, res) => {
            res.json({ message: `Connected to ${process.env.NODE_ENV} server`})
        });
    }

    public start(): void {
        const options = {
            key: fs.readFileSync(process.env.PATH_TO_KEY),
            cert: fs.readFileSync(process.env.PATH_TO_CERT)
        };

        https.createServer(options, this.app).listen(this.port, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${this.port}`);
        });
    }
}

const server = new Server();
server.start();