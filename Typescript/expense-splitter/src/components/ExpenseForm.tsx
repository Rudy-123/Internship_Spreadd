import React, { JSX,useState } from 'react';

interface ExpenseFormProps {
  onAddExpense: (description: string, amount: number, paidBy: string) => void;
  people: string[];
}

function ExpenseForm({ onAddExpense, people }: ExpenseFormProps): JSX.Element {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [paidBy, setPaidBy] = useState<string>('');
  const [newPerson, setNewPerson] = useState<string>('');
  const [showNewPerson, setShowNewPerson] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let personToPay = paidBy;
    if (showNewPerson && newPerson.trim()) {
      personToPay = newPerson;
    }
    if (description.trim() && amount && personToPay) {
      onAddExpense(description, parseFloat(amount), personToPay);
      setDescription('');
      setAmount('');
      setPaidBy('');
      setNewPerson('');
      setShowNewPerson(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>
      <input
        type="text"
        placeholder="Description (e.g., Dinner)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        step="0.01"
        required
      />
      {!showNewPerson ? (
        <>
          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            required
          >
            <option value="">Who paid?</option>
            {people.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="add-person-btn"
            onClick={() => setShowNewPerson(true)}
          >
            + Add New Person
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter new person's name"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowNewPerson(false)}
          >
            Cancel
          </button>
        </>
      )}
      <button type="submit" className="submit-btn">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;