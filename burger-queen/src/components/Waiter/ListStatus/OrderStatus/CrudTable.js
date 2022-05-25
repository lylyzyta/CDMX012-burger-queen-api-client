import React from "react";
import CrudTableRow from "./CrudTableRow";
import { useNavigate } from "react-router-dom";

const CrudTable = ({ data, setDataToEdit, deleteData }) => {

  const navigate = useNavigate();
  
  const handleClick = ()  => {
    navigate('/OrderHistory');
  }

  return (
    <div className="container-OrderStatus">
      <header className="headerTable">
        <h3>Orders Status</h3>
        <button type="button" className="btnViewOrders" onClick={handleClick}>View All Orders</button></header>
      <table>
        <thead className="headTable">
          <tr>
            <th>Num. Order</th>
            <th>Client</th>
            <th>Status</th>
            <th>Date Processed</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <CrudTableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;