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

  return (
    <div className='fs-5 w-100 position-relative '>
      <span className='animateText text-nowrap'>
        Total amount: {parseFloat(amount)}
      </span>
    </div>
  );
};

export default Amount;
