//ES6=ECMAScript 6 various updates in JS with new features
//var keyword used for declaration but the variable was accessible outside its scope (function) so let used 
//variables declared using the let and const are block scoped
function sayhello(){
  for(let i=0;i<=5;i++){
    console.log(i);
  }//console.log(i);
}
sayhello();

const person={
  name:'ABC',
  walk(){
    console.log(this); //this returns reference to the current object
  },
}
person.walk();

const square = number => number*number
console.log(square(5));

const jobs=[
  {id:1, isActive:true},
  {id:2, isActive:true},
  {id:3, isActive:false},
]
const activejobs=jobs.filter(job=>job.isActive);