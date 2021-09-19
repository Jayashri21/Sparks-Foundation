const express = require('express');
const app = express();
const cors = require('cors');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

//config of cors
app.use(cors());

//configure of express to recevie data
app.use(express.json());


//configure of dotenv
dotEnv.config('./.env');

//configure of router
app.use('/api',require('./Router'));

const hostname=process.env.HOST_NAME;
const port= 5000;

//connection to mongoDB
mongoose.connect(process.env.MONGO_DB_LOCAL_URL,{ useNewUrlParser: true }
).then((res)=>
{
    console.log(`Successfully Connected to MongoDB.......`)
}).catch((err)=>
{
    console.error(err);
    process.exit(1);//stops nodejs process if unable to connect

});


app.get('/',(req,res)=>
{
    res.send(`<h2>Welcome to Banking Backend Server</h2>`);
});

app.listen( 5000,()=>
{
    console.log(`Express Server is started at  ${process.env.PORT || 5000}`);
})