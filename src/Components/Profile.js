// import React, { useState, Fragment } from "react";
// import Form from "./Form";
// import Table from "./Table";
// import Amount from "./amount";
// function Profile() {
//     const [tableData, setTableData] = useState([]);
//     const [formObject, setFormObject] = useState({
//         name: "",
//         amount: "",
//         type: " ",
//         date: "",
//     });
//     const onValChange = (event) => {
//         const value = (res) => ({
//             ...res,
//             [event.target.name]: event.target.value,
//         });
//         setFormObject(value);
//     };
//     const onFormSubmit = (event) => {
//         event.preventDefault();
//         const checkVal = !Object.values(formObject).every((res) => res === "");
//         if (checkVal) {
//             const dataObj = (data) => [...data, formObject];
//             setTableData(dataObj);
//             const isEmpty = { name: "", amount: "", type: "", date: '' };
//             setFormObject(isEmpty);
//         }
//     };
//     return (
//         <Fragment>
//             <div className="flex-container1">
//                 <div className="flex-item-left1">
//                 <Form
//                     onValChange={onValChange}
//                     formObject={formObject}
//                     onFormSubmit={onFormSubmit}
//                 />
//                 </div>
            
//             <div className="flex-item-right1">
//                 <Table tableData={tableData} />
//             </div>
            
//             </div>
//             <marquee className="header">
//             <Amount amountData = {tableData}></Amount>
//             </marquee>
//         </Fragment>
//     );
// }
// export default Profile;