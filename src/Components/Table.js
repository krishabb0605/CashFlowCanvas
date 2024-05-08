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
    const newData = tableData.filter(
      (_, index) => !selectedRows.includes(index)
    );
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
          <table className='table' style={{margin:'0px'}}>
            <thead>
              <tr
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'black',
                }}
              >
                <th
                  style={{
                    backgroundColor: '#b9b9d7',
                    fontWeight: 'bold',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                  }}
                >
                  <input
                    type='checkbox'
                    checked={selectedRows.length === tableData.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th
                  style={{
                    backgroundColor: '#b9b9d7',
                    fontWeight: 'bold',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                  }}
                >
                  Index
                </th>
                <th
                  style={{
                    backgroundColor: '#b9b9d7',
                    fontWeight: 'bold',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                  }}
                >
                  Expence name
                </th>
                <th
                  style={{
                    backgroundColor: '#b9b9d7',
                    fontWeight: 'bold',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                  }}
                >
                  Expence amount
                </th>
                <th
                  style={{
                    backgroundColor: '#b9b9d7',
                    fontWeight: 'bold',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                  }}
                >
                  Get/spend
                </th>
                <th
                  style={{
                    backgroundColor: '#b9b9d7',
                    fontWeight: 'bold',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                  }}
                  onClick={handleSortByDate}
                  className='pointer1'
                >
                  <i className='fa fa-sort' />
                  Date
                </th>
                <th
                  style={{
                    backgroundColor: '#b9b9d7',
                    fontWeight: 'bold',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'black',
                  }}
                >
                  {' '}
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
                  <tr
                    key={index}
                    style={{
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'black',
                    }}
                  >
                    <td>
                      <input
                        type='checkbox'
                        checked={selectedRows.includes(index)}
                        onChange={() => handleRowSelect(index)}
                      />
                    </td>
                    <td
                      style={{
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'black',
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'black',
                      }}
                    >
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
                      style={{
                        color: data.type == 'GET' ? 'green' : 'red',
                        fontWeight: 'bold',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'black',
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
                    <td
                      style={{
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'black',
                      }}
                    >
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
                    <td
                      style={{
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'black',
                      }}
                    >
                      {data.date instanceof Date
                        ? data.date.toLocaleDateString('en-GB')
                        : ''}
                    </td>
                    <td
                      style={{
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'black',
                      }}
                    >
                      {editingRowIndex === index ? (
                        <span
                          className='fa fa-check-square-o pointer1'
                          onClick={handleFormSubmit}
                        >
                          {' '}
                          &nbsp; Save
                        </span>
                      ) : (
                        <span
                          className='fa fa-edit pointer1'
                          onClick={() => handleEditClick(index)}
                        >
                          &nbsp;Edit
                        </span>
                      )}
                      {/* <span className="fa fa-trash-o pointer1" onClick={() => onDeleteRow(index)} /> */}
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
