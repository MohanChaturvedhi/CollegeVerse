const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected",()=>{
    console.log("connected to the database")
})
mongoose.connection.on("error",()=>{
    console.log("error in connecting to the database")
})
mongoose.connection.on("disconnect",()=>{
    console.log("disconnected from the database")
})

