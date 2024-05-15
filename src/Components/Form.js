import React from 'react';

function Form({ onValChange, onFormSubmit, selectedDate }) {
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div id='form'>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Expance name *'
              onChange={onValChange}
              name='name'
              required
            />
          </div>
          <div className='mb-3'>
            <input
              type='number'
              className='form-control'
              placeholder='Expence amount *'
              onChange={onValChange}
              name='amount'
              required
            />
          </div>
          <div className='mb-3'>
            <select
              className='form-control'
              name='type'
              onChange={onValChange}
              required
            >
              <option value='' disabled selected>
                Select type
              </option>
              <option value='GET'>GET</option>
              <option value='SPEND'>SPEND</option>
            </select>
          </div>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Date'
              value={selectedDate.toLocaleDateString('en-GB')}
              name='date'
              readOnly
            />
          </div>
          <input
            type='submit'
            className='btn btn-success'
            style={{ minWidth: '100%' }}
          />
        </div>
      </form>
    </div>
  );
}

export default Form;
