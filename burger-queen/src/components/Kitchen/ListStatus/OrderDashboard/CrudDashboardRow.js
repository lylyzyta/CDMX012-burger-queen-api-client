import React from "react";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from 'react';
// import renderTime from "../../../cronometro/remain"
import "../../../cronometro/style.css";
import Timer from "../../../cronometro/timer";

const CrudDashboardRow = ({ el, setChangeStatus }) => {

  let { id, userId, client, status, dateEntry, dateProcessed, products} = el;

  const [startCounter, setStartCounter] = useState(false)

  const countTime = () =>{
    console.log("funciona")
    setStartCounter(true)
  }
 
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
        {!startCounter ? <button type="button" onClick={countTime}>Start</button>: <Timer/>}
        </td>
        <td><button className="btnStatus" onClick={() => setChangeStatus(el)}>ready to serve</button></td>
      </tr>
  );
};

export default CrudDashboardRow;