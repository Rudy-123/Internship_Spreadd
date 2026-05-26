import React,{JSX} from 'react';
import { Expense } from '../types';

interface ExpenseListProps{
    expenses:Expense[];
    onDeleteExpense:(id:number)=>void;
}
function ExpenseList({expenses,onDeleteExpense}:ExpenseListProps):JSX.Element{
    if(expenses.length===0){
        return <div className="empty">No expenses yet. Add one!</div>;
    }
    return (
        <div className="expense-list">
          <h2>Expenses</h2>
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-info">
                <h4>{expense.description}</h4>
                <p>{expense.date}</p>
              </div>
              <div className="expense-details">
                <span className="amount">₹{expense.amount.toFixed(2)}</span>
    
                <span className="paid-by">{expense.paidBy}</span>
              </div>
    
              <button
                onClick={() => onDeleteExpense(expense.id)} 
                className="delete-btn"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      );
    }
    
    export default ExpenseList;