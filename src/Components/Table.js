import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Table({ tableData, setTableData }) {
  const [sortOrder, setSortOrder] = useState('asc');
  const [downloadFormat, setDownloadFormat] = useState('');

  const today = new Date();
  // sorting ...
  const handleSortByDate = () => {
    const sortedData =
      sortOrder === 'asc'
        ? [...tableData].sort((a, b) => a.date - b.date)
        : [...tableData].sort((a, b) => b.date - a.date);

    setTableData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  //download as pdfff
  const handleDownloadFormatChange = (e) => {
    setDownloadFormat(e.target.value);
  };

  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'userdata',
  });
  // *****************EDIT & SAVE***********************************

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [newData, setNewData] = useState({
    name: '',
    type: '',
    amount: '',
    date: '',
  });

  const handleEditClick = (index) => {
    setEditingRowIndex(index);
    setNewData({ ...tableData[index] });
  };

  const handleFormChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      setNewData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setNewData((prevData) => ({
        ...prevData,
        date: event,
      }));
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedData = tableData.map((row, index) =>
      index === editingRowIndex ? { ...newData } : row
    );
    setTableData(updatedData);
    setEditingRowIndex(null);
    setNewData({ name: '', type: '', amount: '', date: '' });
  };

  // ****************************************************

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(tableData.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleDeleteSelected = () => {
    let isConfirm = window.confirm('Sure you want to delete data ?');

    const newData = isConfirm
      ? tableData.filter((_, index) => !selectedRows.includes(index))
      : tableData;
    setTableData(newData);
    setSelectedRows([]);
  };

  // ****************************************************

  return (
    <div>
      <div ref={componentPDF}>
        <div className='overflow-auto table-width px-2'>
          <table className='table m-0'>
            <thead>
              <tr className='table-row'>
                <th className='table-header fw-bold'>
                  <input
                    type='checkbox'
                    checked={selectedRows.length === tableData.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className='table-header fw-bold'>Index</th>
                <th className='table-header fw-bold'>Expence name</th>
                <th className='table-header fw-bold'>Expence amount</th>
                <th className='table-header fw-bold'>Get/spend</th>
                <th
                  className='table-header fw-bold pointer'
                  onClick={handleSortByDate}
                >
                  <i className='fa fa-sort' />
                  Date
                </th>
                <th className='table-header fw-bold'>
                  <span
                    className='fa fa-trash-o pointer'
                    onClick={handleDeleteSelected}
                  />
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => {
                return (
                  <tr key={index} className='table-row'>
                    <td>
                      <input
                        type='checkbox'
                        checked={selectedRows.includes(index)}
                        onChange={() => handleRowSelect(index)}
                      />
                    </td>
                    <td className='table-row'>{index + 1}</td>
                    <td className='table-row'>
                      {editingRowIndex === index ? (
                        <input
                          name='name'
                          className='form-control'
                          value={newData.name}
                          onChange={handleFormChange}
                        />
                      ) : (
                        data.name
                      )}
                    </td>
                    <td
                      className='table-row fw-bold'
                      style={{
                        color: data.type === 'GET' ? 'green' : 'red',
                      }}
                    >
                      {editingRowIndex === index ? (
                        <input
                          name='amount'
                          className='form-control'
                          value={newData.amount}
                          onChange={handleFormChange}
                        />
                      ) : (
                        data.amount
                      )}
                    </td>
                    <td className='table-row'>
                      {editingRowIndex === index ? (
                        <select
                          value={newData.type}
                          name='type'
                          className='form-control'
                          onChange={handleFormChange}
                        >
                          <option value='GET'>GET</option>
                          <option value='SPEND'>SPEND</option>
                        </select>
                      ) : (
                        data.type
                      )}
                    </td>
                    <td className='table-row'>
                      {editingRowIndex === index ? (
                        // <input
                        //   type='date'
                        //   // value={newData.date}
                        //   onChange={handleFormChange}
                        //   name='date'
                        // />
                        <ReactDatePicker
                          selected={newData.date}
                          onChange={handleFormChange}
                          dateFormat='dd/MM/yyyy'
                          maxDate={today}
                          className='form-control'
                        />
                      ) : data.date instanceof Date ? (
                        data.date.toLocaleDateString('en-GB')
                      ) : (
                        data.date
                      )}
                    </td>
                    <td className='table-row'>
                      {editingRowIndex === index ? (
                        <span
                          className='fa fa-check-square-o pointer'
                          onClick={handleFormSubmit}
                        >
                          &nbsp;Save
                        </span>
                      ) : (
                        <span
                          className='fa fa-edit pointer'
                          onClick={() => handleEditClick(index)}
                        >
                          &nbsp;Edit
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <label>Download as : &nbsp; </label>
      <select
        value={downloadFormat}
        onChange={handleDownloadFormatChange}
        className='my-2'
      >
        <option value='' disabled>
          Select format
        </option>
        <option value='pdf'>PDF</option>
        <option value='csv'>CSV</option>
      </select>
      {downloadFormat === 'pdf' && (
        <button onClick={generatePDF} className='btn btn-success btn1'>
          Download
        </button>
      )}
      {downloadFormat === 'csv' && (
        <CSVLink data={tableData} filename='tableData.csv'>
          <button className='btn btn-success btn1'> Download </button>
        </CSVLink>
      )}
    </div>
  );
}

export default Table;
