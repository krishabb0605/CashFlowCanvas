import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CSVLink } from 'react-csv';

function Table({ tableData, setTableData }) {
  const [sortOrder, setSortOrder] = useState('asc');
  const [downloadFormat, setDownloadFormat] = useState('');
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
    const { name, value } = event.target;

    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      <div id='table' ref={componentPDF}>
        <div
          style={{
            width: '100%',
            overflow: 'auto',
            margin: '10px 0',
            border: '1px solid black',
          }}
        >
          <table className='table' style={{ margin: '0px' }}>
            <thead>
              <tr className='table-row'>
                <th className='table-header'>
                  <input
                    type='checkbox'
                    checked={selectedRows.length === tableData.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className='table-header'>Index</th>
                <th className='table-header'>Expence name</th>
                <th className='table-header'>Expence amount</th>
                <th className='table-header'>Get/spend</th>
                <th
                  className='table-header pointer1'
                  onClick={handleSortByDate}
                >
                  <i className='fa fa-sort' />
                  Date
                </th>
                <th className='table-header'>
                  <span
                    className='fa fa-trash-o pointer1'
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
                          value={newData.name}
                          onChange={handleFormChange}
                        />
                      ) : (
                        data.name
                      )}
                    </td>
                    <td
                      className='table-row'
                      style={{
                        color: data.type == 'GET' ? 'green' : 'red',
                        fontWeight: 'bold',
                      }}
                    >
                      {editingRowIndex === index ? (
                        <input
                          name='amount'
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
                        <input
                          type='date'
                          value={newData.date}
                          onChange={handleFormChange}
                          name='date'
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
                          className='fa fa-check-square-o pointer1'
                          onClick={handleFormSubmit}
                        >
                          &nbsp;Save
                        </span>
                      ) : (
                        <span
                          className='fa fa-edit pointer1'
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
      <select value={downloadFormat} onChange={handleDownloadFormatChange}>
        <option>Select format</option>
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
