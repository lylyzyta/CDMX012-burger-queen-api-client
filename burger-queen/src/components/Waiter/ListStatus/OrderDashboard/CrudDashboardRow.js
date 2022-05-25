import React from "react";

const CrudDashboardRow = ({ el, setDataToEdit, deleteData }) => {

  let { id, userId, client, status, dateEntry, dateProcessed, products} = el;

  return (
      <tr>
        <td>{id}</td>
        <td>{userId}</td>
        <td>{client}</td>
        <td>{products.map((product)=><p>{product.quantity} {product.product}</p>)}</td>
        <td>{status}</td>
        <td>{dateEntry}</td>
        <td>{dateProcessed}</td>
        <td>
          <button onClick={() => setDataToEdit(el)}>Editar</button>
          <button onClick={() => deleteData(id)}>Eliminar</button>
        </td>
      </tr>
  );
};

export default CrudDashboardRow;