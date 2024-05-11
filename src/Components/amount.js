import React from 'react';

const Amount = ({ amountData }) => {
  let amount = 0;

  amountData.forEach((data) => {
    if (data.type === 'GET') {
      amount += parseFloat(data.amount);
    } else if (data.type === 'SPEND') {
      amount -= parseFloat(data.amount);
    }
  });

  return <span id='visible'>Total amount: {parseFloat(amount)}</span>;
};

export default Amount;
