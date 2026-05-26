console.log("Hii")
//js handles async code using the settimeout
setTimeout(function xyz(){
    console.log('Heyy There')
},5000)
//it means browser/web api's,wait for 5 sec 
console.log("ABCD");

//as a result the output would have Hii first and as the setTimeout is there so it has a 
//callback function xyz which is passed as an argument to the setTimeout function and it will be
//executed once 5 seconds are over and so output will initiallu have Hii then ABCD then after 5 sec
//the output would also show Heyy There