import React from 'react';
import '../App.css';

export default function Page() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Access form data using event.target
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      address: event.target.address.value,
      date: event.target.date.value,
      time: event.target.time.value,
      gender: event.target.gender.value,
      hobbies: {
        cricket: event.target.cricket.checked,
        travelling: event.target.travelling.checked,
        reading: event.target.reading.checked,
      },
      file: event.target.file.value,
      range: event.target.range.value,
    };

    if (event.target.name.value == 0) {
      alert('Empty name');
    }
    if (event.target.gender.value == 0) {
      alert('hello');
    }
    // Log the form data to the console
    console.log('Form Data:', formData);
  };

  return (
    <div>
      <div className='header'>
        <a href='#contact'>Contact</a>
        <a href='#project'>Project</a>
        <a href='#about'>About</a>
        <a href='#home'>Home</a>
      </div>

      <div className='flex'>
        <div className='nav'>
          <a href='#nav1'>nav1</a>
          <a href='#nav2'>nav2</a>
          <a href='#nav3'>nav3</a>
          <a href='#nav4'>nav4</a>
        </div>

        <div className='main'>
          <form className='form1' onSubmit={handleSubmit}>
            <div className='main-content'>
              <div className='left'>
                <label htmlFor='text'>Enter name : </label>
                <br />
                <input type='text' name='name' />
                <br />

                <label htmlFor='text'>Enter email : </label>
                <br />
                <input type='email' name='email' />
                <br />

                <label htmlFor='text'>Enter password : </label>
                <br />
                <input type='password' name='password' />
                <br />

                <label htmlFor='address'>Enter address : </label>
                <br />
                <textarea rows='10' cols='50' name='address'></textarea>
                <br />

                <label htmlFor='Date'>Select date: </label>
                <br />
                <input type='date' name='date' />
                <br />
              </div>

              <div className='right'>
                <label htmlFor='time'>Select time: </label>
                <br />
                <input type='time' name='time' />
                <br />
                <label htmlFor='Gender'>Select Gender : </label> <br />
                <input type='radio' name='gender' value='male' id='male' />
                <label htmlFor='male'>male</label>
                <input type='radio' name='gender' value='female' id='female' />
                <label htmlFor='female'>female</label> <br />
                <label htmlFor='Hobbies'>Select Hobbies : </label>
                <br />
                <div className='c'>
                  <div className='check'>
                    <input
                      type='checkbox'
                      name='cricket'
                      value='criket'
                      id='cricket'
                    />
                    <label htmlFor='cricket'>cricket</label>
                  </div>
                  <div className='check'>
                    <input
                      type='checkbox'
                      name='travelling'
                      value='travelling'
                      id='travelling'
                    />
                    <label htmlFor='travelling'>travelling</label>
                  </div>
                  <div className='check'>
                    <input
                      type='checkbox'
                      name='reading'
                      value='reading'
                      id='reading'
                    />
                    <label htmlFor='reading'>reading</label>
                    <br />
                  </div>
                </div>
                <label htmlFor='File'>Select File : </label> <br />
                <input type='file' name='file' />
                <br />
                <label htmlFor='range'>Select Range : </label> <br />
                <input type='range' name='range' /> <br />
                <input type='submit' name='submit' value='submit' />
                <input type='reset' name='reset' value='reset' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
