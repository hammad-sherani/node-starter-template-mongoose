import express from "express";
import connectDb from "./config/db.js";
import routes from "./routes/index.js";
import cors from "cors";
import { createServer } from "http";
import errorHandler from "./middleware/error.middleware.js";

const app = express();
const server = createServer(app);

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('API is working');
});

app.use("/api/v1", routes);
app.use(errorHandler);

connectDb();
export { server };

export default app;