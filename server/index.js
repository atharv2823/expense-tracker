import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import { postSignup,postLogin } from './controllers/user.js';
import { postTransaction ,getTransaction, deleteTransaction} from './controllers/transaction.js';


const app = express();
app.use(express.json());
app.use(cors());


// connect to MOngoDB

const connectdb = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL)

    if(conn){
        console.log(`MongoDB Connected Successfully `);
    }
};

connectdb();

app.get(`/`,(req ,res)=>{
    res.json({
        message :"Welcome to Expence traker API"
    })
})


app.post("/signup",postSignup )

app.post("/login", postLogin)

app.post("/transaction",postTransaction)

app.get("/transaction",getTransaction)

app.delete("/transaction/:id",deleteTransaction)


const PORT = process.env.PORT || 5000 ;

app.listen(PORT,(()=>{
    console.log(`server is ruuning on port ${PORT}`);

}))
