import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import routes from './routes/index.js';
import { PORT, UPLOADS_DIR } from '../env.js';
import listEndpoints from 'express-list-endpoints';
import { errorController, notFoundController } from './middlewares/index.js';
import { testDatabaseConnection } from './db/getPool.js'; 
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();

server.use(cors()); // Acepta pedidos desde cualquier IP
server.use(morgan('dev'));
server.use(express.json());
server.use(express.static(UPLOADS_DIR));

// Middleware que "desencripta" un body en formato "form-data" creando la propiedad
// "body" y la propiedad "files" en el objeto "request"
server.use(fileUpload({ useTempFiles: true }));

// Middleware de registro de solicitudes
server.use((req, res, next) => {
    next();
});

// Middleware de rutas
server.use('/', routes);

// Middleware de ruta no encontrada
server.use(notFoundController);

// Middleware de manejo de errores
server.use(errorController);

// Función para iniciar el servidor
const startServer = async () => {
    try {
        // Verificar conexión a la base de datos antes de iniciar el servidor
        await testDatabaseConnection();

        // Iniciar el servidor para escuchar en el puerto especificado, donde esta el servidor arrancado?
        server.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
            const serverEndpoints = listEndpoints(server);
            console.log('Rutas de la API:');
            serverEndpoints.forEach(route => console.log(route.path));
        });
    } catch (error) {
        console.error('No se pudo establecer conexión con la base de datos:', error);
        process.exit(1); // Finaliza el proceso si no se puede conectar a la base de datos
    }
};

// Llama a la función para iniciar el servidor
startServer();