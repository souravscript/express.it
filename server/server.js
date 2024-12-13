import express from "express";
import { connectToDatabase } from "./src/config/db-config.js";
import mainRouter from "./src/api/routes/index.js"
const app = express();
const PORT = 8081;


app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const connect=await connectToDatabase()

/*app.get("/test",(req,res)=>{
    res.status(201).json({message:"Test successfull"})
})*/
app.use(mainRouter)

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
