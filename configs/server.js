import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/users/users.routes.js'
import apiLimiter from "../src/middlewares/validar-peticiones.js";
import patienteRoutes from '../src/patients/patient.routes.js';
import medicineRoutes from '../src/medications/medication.routes.js';
import categoryRoutes from '../src/categories/categorie.routes.js';
import appointmentsRoutes from '../src/quotes/appointments.routes.js';
import filesRoutes from '../src/files/file.routes.js';
import serviceRoutes from '../src/servicess/service.routes.js';
import prescriptionRoutes from '../src/prescriptions/prescription.routes.js'
import billRoutes from '../src/bills/bill.routes.js';
import doctorsRoutes from '../src/doctors/doctors.routes.js';
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
    };

   
    routes() {  
        this.app.use(this.doctorPath, doctorsRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.patientPath, patienteRoutes);
        this.app.use(this.medicinePath, medicineRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.filesPath, filesRoutes);
        this.app.use(this.quotesPath, appointmentsRoutes);
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