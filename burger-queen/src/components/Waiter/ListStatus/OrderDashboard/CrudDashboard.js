import React from "react";
import CrudDashboardRow from "./CrudDashboardRow";

const CrudDashboard = ({ data, setDataToEdit, deleteData }) => {
  return (
    <div className="container-OrderHistory">
      <h3>Orders History</h3>
      <table>
        <thead>
          <tr>
            <th>Num. Order</th>
            <th>User Id</th>
            <th>Client</th>
            <th>Products</th>
            <th>Status</th>
            <th>Date Entry</th>
            <th>Date Processed</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <CrudDashboardRow
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

export default CrudDashboard;