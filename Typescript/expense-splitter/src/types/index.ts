import { StringMappingType } from "typescript";

/*what should the data look like i.e the interface of the data */
export interface Expense{
    id:number,
    description:string,
    amount:number,
    paidBy:string,
    date:string,    
}
export interface Person{
    name:string,
    totalspent:number,
    share:number,
    balance:number,
}
//settlement for to whom a person would pay
export interface Settlement{
    from:string,
    to:string,
    amount:number,
}