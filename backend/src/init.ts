import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
// manejador de erroes de la api
import errorHandler from "./middlewares/errorHandler";
// morgan para ver las peticiones que llegan al servidor
import morgan from "morgan";
/* Lista de importaciones de rutas para la api */
import AuthRoutes from "./routes/auth.routes";
import ProductsRoutes from "./routes/products.routes";
import { sequelize } from "./config";
import { swaggerSpec } from "./swagger";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const API_VERSION = "/api/v1";

const app: Application = express();

// uso de las rutas de la api

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(morgan("dev"));
// lista de rutas
app.use(`${API_VERSION}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(`${API_VERSION}`, AuthRoutes);
app.use(`${API_VERSION}`, ProductsRoutes);

sequelize.sync({ force: false }).then(() => {
	console.log("Base de datos sincronizada");
});
export default app;
