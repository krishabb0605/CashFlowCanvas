import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.css";

function Form({ onValChange, formObject, onFormSubmit, selectedDate }) {
    return (
        <div>
            <form>
                <div id="form">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Expance name"
                            onChange={onValChange}
                            value={formObject.name}
                            name="name"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Expence amount"
                            onChange={onValChange}
                            value={formObject.amount}
                            name="amount"
                        />
                    </div>
                    <div className="mb-3">
                        <select
                            className="form-control"
                            value={formObject.type}
                            name="type"
                            onChange={onValChange}
                        >
                            <option val="1">Select type</option>
                            <option value="GET">GET</option>
                            <option value="SPEND">SPEND</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Date"
                            // onChange={onValChange}
                            value={selectedDate.toLocaleDateString('en-GB')}
                            name="date"
                        />
                    </div>
                    <div className="d-grid">
                        <input
                            type="submit"
                            onClick={onFormSubmit}
                            className="btn btn-success"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;
