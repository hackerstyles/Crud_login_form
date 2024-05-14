const express = require("express");
const cors = require('cors')

const loginRouter = require('./login')

require('../database') 

const app = express(); 

const port  = 3006 

app.use(express.json());
app.use(express.urlencoded());

app.use(cors()); 


app.use('/api/v1/',loginRouter) 

app.listen(port,()=>{
    console.log(`app is listensing in the port ${port}`)
});