import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';



//App config
const app = express();
const port = process.env.PORT_NO || 4000;
connectDB();

//middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));

//Api endpoints
app.use('/api/user', userRouter);

app.get('/',(req, res)=>{
    res.send("API Working...")
})

app.listen(port, (req, res)=>{
    console.log(`app listening on port: ${port}`)
})