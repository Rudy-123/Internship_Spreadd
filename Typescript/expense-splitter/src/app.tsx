import React, { useState, useEffect } from 'react';
import './App.css'
import { Expense, Settlement } from './types';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Settlements from './components/Settlements';
import { JSX } from 'react/jsx-runtime';

function App(): JSX.Element{
    const [Expenses,setExpenses]=useState<Expense[]>([]);//array of expense objects
    const [people,setpeople]=useState<Set<string>>(new Set());//use this set to track unique names
    
    // Load data from localStorage when app starts
    useEffect(() => {
      const saved = localStorage.getItem('expenses');
      if (saved) {
        setExpenses(JSON.parse(saved));
      }
    }, []);

    // Save data to localStorage whenever expenses change
    useEffect(() => {
      localStorage.setItem('expenses', JSON.stringify(Expenses));
    }, [Expenses]);

    const addExpense=(
        description:string,
        amount:number,
        paidBy:string,
    ):void=>{
        const newExpense: Expense={
            id:Date.now(),
            description,
            amount,
            paidBy,
            date:new Date().toLocaleDateString(),//todays date
        };
        setExpenses([...Expenses,newExpense]);//add expenses to the array
        setpeople(new Set([...people,paidBy]));//add person to people set
    };
    const deleteExpense=(id:number):void=>{
       setExpenses(Expenses.filter(e=>e.id!==id));//filter only keeps the id that doesnot match so
    };
    const calculateSettlements=():Settlement[]=>{
        //who owes to whom and how much money
        if(Expenses.length===0){return [];}
        const totalExpenses=Expenses.reduce((sum,e)=>sum+e.amount,0);//calculate total and share per person
        //reduce adds all the expense amounts
        const sharePerPerson=totalExpenses/people.size;
        const balance:{[key:string]:number}={};//key is the name so string and value is the number(amounts)
        people.forEach(person=>{
            balance[person]=0;//initialze each person balance=0
        });
        Expenses.forEach(Expense=>{
            balance[Expense.paidBy]+=Expense.amount;//add how much person actually paid
        });
        people.forEach(person=>{
            balance[person]-=sharePerPerson;//subtract the share per person so now we have the extra money if ?0 if someone had paid
        });
        const settlements:Settlement[]=[];//match debitors with the creditors
        //get people who owe money negative balance
        const debitors=Object.entries(balance).filter(([_,balance])=>balance<0);
        //get people who gave extra money
        const creditors=Object.entries(balance).filter(([_,balance])=>balance>0);
        debitors.forEach(([debitor,debt])=>{
            creditors.forEach(([creditor,credit])=>{
                if(Math.abs(debt)>0.01&&credit>0.01){
                    const amount=Math.min(credit,Math.min(Math.abs(debt)));
                    settlements.push({from:debitor,to:creditor,amount:parseFloat(amount.toFixed(2))})
                    balance[debitor]-=amount;
                    balance[creditor]+=amount;
                };
            });
        });
        return settlements.filter(s=>s.amount>0.01);//return only settlements with non-zero amounts
    };
    const totalAmount=Expenses.reduce((sum,e)=>sum+e.amount,0);
    return (
        <div className="app">
          <header className="header">
            <h1>💸 Expense Splitter</h1>
            <p>Split expenses easily with friends</p>
          </header>
          <div className="container">
            <div className="left-section">
              <ExpenseForm 
                onAddExpense={addExpense}          
                people={Array.from(people)}    
              />
              <ExpenseList 
                expenses={Expenses}                 
                onDeleteExpense={deleteExpense}    
              />
            </div>
            <div className="right-section">
              <div className="summary">
                <h3>Summary</h3>
                <div className="stat">
                  <span>Total Expenses:</span>
                  <span className="amount">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="stat">
                  <span>People:</span>
                  <span className="count">{people.size}</span>
                </div>
                {people.size > 0 && (
                  <div className="stat">
                    <span>Per Person:</span>
                    <span className="amount">
                      ₹{(totalAmount / people.size).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              <Settlements settlements={calculateSettlements()} />
            </div>
          </div>
        </div>
      );
    }
    export default App;