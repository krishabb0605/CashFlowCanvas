import './App.css';
import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import Form from './Components/Form';
import Table from './Components/Table';
import Amount from './Components/amount';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);

  //calender
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  //Form-table ....
  const reviveDates = (key, value) => {
    if (key === 'date') {
      return new Date(value);
    }
    return value;
  };

  const [tableData, setTableData] = useState(() => {
    const storedData = localStorage.getItem('tableData');
    return storedData ? JSON.parse(storedData, reviveDates) : [];
  });

  const [query, setQuery] = useState('');

  const [formObject, setFormObject] = useState({});

  const onValChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const checkVal = !Object.values(formObject).every((res) => res === '');
    if (checkVal && validateValues(formObject) === 1) {
      const newData = { ...formObject, date: selectedDate };
      const dataObj = (data) => [...data, newData];
      setTableData(dataObj);
      setSelectedDate(null);
      setFormObject({});
      setErrors(validateValues(formObject));
      setSubmitting(true);
      setShowForm(false);
    }
  };

  // for searching ...
  const search = (data) => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        (item.date instanceof Date &&
          item.date.toLocaleDateString('en-GB').toLowerCase().includes(query))
    );
  };

  // for validation
  const [Errors, setErrors] = useState({});
  const [Submitting, setSubmitting] = useState({});

  const validateValues = (inputValues) => {
    if (inputValues.name.length === 0) {
      alert('Name is empty');
      return 0;
    }
    if (inputValues.amount.length === 0) {
      alert('Amount is empty');
      return 0;
    }
    if (inputValues.type.length === 0) {
      alert('Please select type');
      return 0;
    }
    return 1;
  };

  return (
    <div>
      <div></div>
      {/* header total amount display */}
      <div className='amount'>
        <div className='logo-container'>
          <div>
            <img src='logo2.png' className='logo' alt='logo'></img>
            <b className='logoName'>CASHFLOW_CANVAS</b>
          </div>
        </div>
        <marquee id='amount'>
          <Amount amountData={tableData}></Amount>
        </marquee>
      </div>

      <div className='flex-container'>
        <div className='flex-item-left'>
          {/* display calender */}
          <div id='calender'>
            <h5 className='header'>Select a Date: </h5>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              maxDate={new Date()}
            />
          </div>

          {/* display form */}
          <div className='flex-item-left1'>
            {showForm && (
              <Form
                onValChange={onValChange}
                formObject={formObject}
                onFormSubmit={onFormSubmit}
                selectedDate={selectedDate}
              />
            )}
          </div>
        </div>

        <div className='flex-item-right'>
          <div className='flex-container1'>
            <div className='flex-item-right1'>
              {/* search bar */}
              <div className='form-group has-search'>
                <span className='fa fa-search form-control-feedback'></span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search'
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              {/* display table */}
              <Table
                tableData={search(tableData)}
                setTableData={setTableData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
