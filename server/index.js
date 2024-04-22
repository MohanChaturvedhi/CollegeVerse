const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
require('dotenv').config();
const { errorHandler } = require("./middleware/error");


const app=express();
app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
    })
  );

     app.use(bodyParser.json());
  app.use(express.json());
    app.use(express.urlencoded({extended:false}));

    app.get('/api',(req,res)=>{
      res.json({message:"Welcome to the API"})
    })

    app.use('/api',require("./routes"));
    
    require('./config/db');
app.use(errorHandler);

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})