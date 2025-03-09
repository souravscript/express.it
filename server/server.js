import express from "express";
import cors from 'cors'
import { connectToDatabase } from "./src/config/db-config.js";
import mainRouter from "./src/api/routes/index.js"
import { swaggerUi, swaggerDocs } from './src/swagger.js';
const app = express();
const PORT = 8081;

app.use(cors())
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const connect=await connectToDatabase()

/*app.get("/test",(req,res)=>{
    res.status(201).json({message:"Test successfull"})
})*/
app.use(mainRouter)

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const startServer = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server up and running at ${PORT}`);
        });
    } catch (err) {
        console.log("Error connecting the server due to: ", err);
    }
};

startServer();
