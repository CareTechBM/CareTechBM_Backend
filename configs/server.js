import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/routes/users.routes.js'
import apiLimiter from "../src/middlewares/validar-peticiones.js";
import doctorsRoutes from '../src/Routes/doctors.routes.js';
import patientRoutes from '../src/Routes/patients.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.doctorPath = '/caretech/v1/doctor'
        this.authPath = '/caretech/v1/auth'
        this.patientPath = '/caretech/v1/patient'

        this.conectarDB(); 
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    
    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use( apiLimiter );
    };

   
    routes() {  
        this.app.use(this.doctorPath, doctorsRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.patientPath, patientRoutes);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;