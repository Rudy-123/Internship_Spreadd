require('dotenv').config()
const express=require('express')
const corsMiddleware=require('./middlewares/cors')
const errorHandler=require('./middlewares/errorHandler')
const routes=require('./routes/index')
const app=express();

app.use(express.json())//parse the JSON 
app.use(express.urlencoded({extended:true}))//parse the form data
app.use(corsMiddleware)

app.use('/api/v1', routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    data: null
  });
});

app.use(errorHandler);

module.exports = app;