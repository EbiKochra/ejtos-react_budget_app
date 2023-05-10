import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { expenses, budget, dispatch } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);

  const totalExpenses = expenses.reduce((total, expense) => {
    return total + expense.cost;
  }, 0);

  const handleBudgetChange = (event) => {
    const value = parseInt(event.target.value);
    if (value <= 20000) {
      if (value >= totalExpenses) {
        setNewBudget(value);
      } else {
        setNewBudget(totalExpenses);
        alert("Budget cannot be lower than the total expenses!");
      }
    } else {
      alert("Budget value cannot exceed 20,000");
    }
  };

  const handleSaveBudget = () => {
    dispatch({
      type: 'SET_BUDGET',
      payload: newBudget
    });
  };

  const handleIncreaseBudget = () => {
    const increasedBudget = newBudget + 10;
    if (increasedBudget <= 20000) {
      setNewBudget(increasedBudget);
    } else {
      alert("Budget value cannot exceed 20,000");
    }
  };

  const handleDecreaseBudget = () => {
    const decreasedBudget = newBudget - 10;
    if (decreasedBudget >= 0) {
      if (decreasedBudget >= totalExpenses) {
        setNewBudget(decreasedBudget);
      } else {
        setNewBudget(totalExpenses);
        alert("Budget cannot be lower than the total expenses!");
      }
    } else {
      alert("Budget value cannot be negative");
    }
  };

  return (
    <div>
      <div className='alert alert-secondary'>
      <span>Budget: $<input type='text' className='form-control' value={budget} disabled/></span>

      </div>
      <div className='input-group mb-3'>
        <div className='input-group-prepend'>
          <button className='btn btn-outline-secondary' type='button' onClick={handleDecreaseBudget}>-</button>
        </div>
        <input type='number' className='form-control' value={newBudget} onChange={handleBudgetChange} />
        <div className='input-group-append'>
          <button className='btn btn-outline-secondary' type='button' onClick={handleIncreaseBudget}>+</button>
        </div>
      </div>
      <button className='btn btn-primary' onClick={handleSaveBudget}>Save</button>
    </div>
  );
};

export default Budget;