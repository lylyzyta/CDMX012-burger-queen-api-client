import React from "react";
import editIcon from '../../../../img/OrderStatus/editOrder.svg';
import deleteIcon from '../../../../img/OrderStatus/deleteOrder.svg';


const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { id, client, status, dateProcessed } = el;

  return (
      <tr>
        <td>{id}</td>
        <td>{client}</td>
        <td ><div className="status">{status}</div></td>
        <td>{dateProcessed}</td>
        <td className="btnActions">
          <button className="btnStatus" onClick={() => setDataToEdit(el)}><img className="icon" src={editIcon} alt='edit-icon'/></button>
          <button className="btnStatus"  onClick={() => deleteData(id)}><img className="icon" src={deleteIcon} alt='delete-icon'/></button>
        </td>
      </tr>
  );
};

export default CrudTableRow;