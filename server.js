import express from "express"
import cors from "cors"
import upload from './middleware.js'

const app = express();

app.use(express.json())
app.use(cors());

app.post('/upload',upload.array('pictures'),(req,res)=>{
    res.send(`image uploaded with name ${req.s3Name}`)
})

app.listen(8002, ()=>{console.log("running")})
