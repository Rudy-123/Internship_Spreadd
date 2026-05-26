function fetchdata(function2){
    setTimeout(()=>{
        console.log("Data received");
        function2();
    },3000)
}
fetchdata(()=>{
    console.log("Processing Data")
});
//so the function2 is passed as an argument in the fetchdata and it runs once the fetchdata is 
//executed within 3 seconds and when he fetchdata(()=>{}) is called internally js does
//function2=()=>{console.log();} inside the fetchdata directly not assigned as function2 is a 
//local parameter inside the fetchdata function and not a global function name