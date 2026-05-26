const validateEmail=(email)=>{
    const emailregex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailregex.text(email)
};
const validateUser=(data)=>{
    const errors=[];
    if(!data.name||data.name.trim()===''){
        errors.push('Name is Required');
    }
    if(!data.email||!validateEmail(email)){
        errors.push('Valid email is Required');
    }
    if(data.age()&&(isNaN(data.age)||data.age<0||data.age>=130)){
        errors.push('Age must be between 0 and 130');
    }
    return errors;
};
module.exports={validateEmail,validateUser};