import React,{JSX} from 'react';
import { Settlement } from '../types';

interface SettlementsProps{
    settlements :Settlement[];
}
function Settlements({settlements}:SettlementsProps): JSX.Element{
    if (settlements.length === 0) {
        return (
          <div className="settlements empty">
            No settlements needed!
          </div>
        );
    }
    return (
        <div className="settlements">
          <h3>Who Owes Who</h3>
          {settlements.map((settlement, index) => (
            <div key={index} className="settlement-item">
              <span className="from">{settlement.from}</span>
              <span className="arrow">→</span>
              <span className="to">{settlement.to}</span>
              <span className="amount">₹{settlement.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      );
    }
    export default Settlements;