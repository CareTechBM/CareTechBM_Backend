import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/routes/users.routes.js'
import apiLimiter from "../src/middlewares/validar-peticiones.js";
import doctorsRoutes from '../src/Routes/doctors.routes.js';
import patientRoutes from '../src/Routes/patients.routes.js';
import medicineRoutes from '../src/Routes/medications.routes.js';
import categoryRoutes from '../src/Routes/categories.routes.js';
import quotesRoutes from '../src/Routes/quotes.routes.js';
import filesRoutes from '../src/Routes/files.routes.js';
import serviceRoutes from '../src/Routes/services.routes.js';
import prescriptionRoutes from '../src/Routes/prescriptions.routes.js';
import billRoutes from '../src/Routes/bills.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.doctorPath = '/caretech/v1/doctor'
        this.authPath = '/caretech/v1/auth'
        this.patientPath = '/caretech/v1/patient'
        this.medicinePath = '/caretech/v1/medicine'
        this.categoryPath = '/caretech/v1/category'
        this.quotesPath = '/caretech/v1/quotes'
        this.filesPath = '/caretech/v1/files'
        this.servicePath = '/caretech/v1/service'
        this.prescriptionPath = '/caretech/v1/prescription'
        this.billPath = '/caretech/v1/bill'
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
        this.app.use(this.medicinePath, medicineRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.filesPath, filesRoutes);
        this.app.use(this.quotesPath, quotesRoutes);
        this.app.use(this.servicePath, serviceRoutes);
        this.app.use(this.prescriptionPath, prescriptionRoutes);
        this.app.use(this.billPath, billRoutes);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;