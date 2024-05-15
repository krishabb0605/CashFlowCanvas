import './App.css';
import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import Form from './Components/Form';
import Table from './Components/Table';
import Amount from './Components/amount';
import logo from './Finance.png';

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

    const newData = { ...formObject, date: selectedDate };
    console.log(newData);
    const dataObj = (data) => [...data, newData];

    setTableData(dataObj);
    setSelectedDate(null);
    setFormObject({});
    setShowForm(false);
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

  return (
    <div
      className='mainClass'
      style={{
        '--windowHeight': `${window.innerHeight}px`,
      }}
    >
      {/* header total amount display */}

      <div className='amount'>
        <div
          className='d-flex align-items-center'
          style={{ height: '80px', width: '130px' }}
        >
          <img src={logo} className='logo' alt='logo'></img>
        </div>
        <Amount amountData={tableData}></Amount>
      </div>

      <div className='flex-container d-flex flex-column flex-lg-row'>
        <div className='flex-item-left p-2'>
          {/* display calender */}
          {/* <div> */}
          <h5 className='text-center'>Select a Date: </h5>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            maxDate={new Date()}
          />
          {/* </div> */}

          {/* display form */}
          <div className='mt-4'>
            {showForm && (
              <Form
                onValChange={onValChange}
                onFormSubmit={onFormSubmit}
                selectedDate={selectedDate}
              />
            )}
          </div>
        </div>

        <div className='flex-item-right py-2 text-center'>
          {/* search bar */}
          <div className='form-group has-search position-relative mx-3 mb-2' >
            <span className='fa fa-search form-control-feedback'></span>
            <input
              type='text'
              className='form-control'
              placeholder='Search'
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* display table */}
          <Table tableData={search(tableData)} setTableData={setTableData} />
        </div>
      </div>
    </div>
  );
};

export default App;
