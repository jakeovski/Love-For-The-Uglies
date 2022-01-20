import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authenticateRoutes from "./routes/auth.js";

//Configure env variables
dotenv.config();

//Configure Express
const app = express();
app.use(express.json({limit:'20mb'}));
app.use(express.urlencoded({limit:'20mb',extended:true}));
app.use(cors());

//Routes
app.use('/api/auth', authenticateRoutes);


//Connect to the database
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(process.env.SERVER_PORT, () => console.log(`Server started at port ${process.env.SERVER_PORT}`)))
    .catch((error) => console.log(error));
