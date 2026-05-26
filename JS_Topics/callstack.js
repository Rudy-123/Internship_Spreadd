//just how the calls would happen in order they would be pushed in the stack and 
//then after their execution they are popped 

function multiply(a,b){
    return a*b;
}
function square(n){
    return multiply(n,n);
}
function printsquare(n){
    var squared=square(n);
    console.log(squared);
}
printsquare(4);

//the stack would have main()->printsquare(4)->square(4)->multiply(4,4)
//multiply returns 4*4 i.e 16 then it pops out then square(4) returns 16 pops out then 
//console.log() goes it prints and pops out of the stack and then printsquare(4) pops out