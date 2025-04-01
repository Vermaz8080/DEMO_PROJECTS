import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { CreateBlogPost, DeleteBlogPost, GetBlogPost, UpdateBlogPost } from './Controller/BlogPost.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/blogPost",CreateBlogPost)
app.put("/blogPost",UpdateBlogPost)
app.delete("/blogPost",DeleteBlogPost)
app.get("/blogPost",GetBlogPost)


mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database connected!!!");
    app.listen(process.env.PORT,()=>{
        console.log("Server running  at Port:" + process.env.PORT);
    });
}).catch(()=>{
    console.log("Unable to connect database!!!");
})