import express from 'express'
import cors from 'cors' //? This library helps in creating a communication of backend with the frontend.
import mongoose from 'mongoose'
import {userRouter} from './routes/user.js'
import { recipeRouter } from './routes/recipes.js'

const app = express();
app.use(express.json()); //*  Converts the data from frontend into JSON format.
app.use(cors());

app.use('/auth',userRouter);
app.use('/recipes', recipeRouter)

mongoose.connect('mongodb+srv://vedantmahajan271:vanshay2408@recipes.wdnlmq1.mongodb.net/?retryWrites=true&w=majority')

app.listen(4000, ()=>{
    console.log('Server started');
})