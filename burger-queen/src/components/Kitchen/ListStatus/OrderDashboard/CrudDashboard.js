import React from "react";
import CrudDashboardRow from "./CrudDashboardRow";

const CrudDashboard = ({ data, setChangeStatus }) => {
  return (
    <div className="container-OrderHistoryKitchen">
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
            <th>Time</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <CrudDashboardRow
                key={el.id}
                el={el}
                setChangeStatus={setChangeStatus}
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