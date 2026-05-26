//cors is the cross origin resource sharing it basically enables the calls that are made
//by the frontend to the backend which are running on different ports if cors is not there
//then the frontend would make a call to the backend but as it running on diff origin
//so browser would detects that the request is being made to a different origin other than 
//the frontend is running and blocks the request due to same origin policy 
//so cors is needed to allow the cross origin requests
const cors=require('cors');
const corsOptions={
    origin:process.env.ALLOWED_ORIGINS?.split('.')||'http://localhost:3001',
    credentials:true,
    methods:['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders:['Content-type','Authorization'],
    optionsSuccessStatus:200
};
module.exports=cors(corsOptions);