const generateId=()=>{
    return Math.floor(Math.random()*1000)+1;//random ID between 1-1000
};
const getcurrenttime=()=>{
    return new Date().toISOString();//toISOString changes in standard format
};
const responseformat=(success,message,data=null)=>{
    return {
        success,message,data,timestamp:getcurrenttime()
    };
};
module.exports={generateId,getcurrenttime,responseformat};