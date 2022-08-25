const express= require("express");
const cors= require("cors");
const connect= require("./config/db")



const app= express()

app.use(cors());
app.use(express.json());



app.listen(9999,async()=>{
    try {
        await connect();
        console.log("Listening port number 9999");
    } catch (error) {
        console.log(error)
    }
})