import React from "react";
import { useState, useEffect } from 'react';
import Timer from "../cronometro/timer";
import { helpHttp } from "../../../../helpers/helpHttp";
import CrudForm from "./CrudForm";
import style from './CrudDashboardRow.module.css';

const CrudDashboardRow = ({ el }) => {

  let { id, userId, client, status, dateEntry, dateProcessed, products} = el;
  const [startCounter, setStartCounter] = useState(false)

  const countTime = () =>{
    console.log("funciona")
    setStartCounter(true)
  }

  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);


  let api = helpHttp();
  let url = "https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/orders";

  useEffect(() => {

    helpHttp()
      .get(url)
      .then((res) => {
        //console.log(res);
        if (!res.err) {
          setDb(res);
        } else {
          setDb(null);
        }
      });
  }, [url]);

  const [startButton, setStartButton] = useState(false)

  const handleSubmit = () =>{
  setDataToEdit(el);
  console.log('funciona');
  setStartButton(true)
  }

const updateData = (data) => {

  let endpoint = `${url}/${data.id}`;
  //console.log(endpoint);

  let options = {
    body: data,
    headers: { "content-type": "application/json" },
  };

  api.put(endpoint, options).then((res) => {
    //console.log(res);
    if (!res.err) {

      let newData = db.map((el) => (el.id === data.id ? data : el));
      setDb(newData);
    }
  });
};

/*let firstDate =  new Date('Mon May 30 2022 13:10:00 GMT-0500'); // .slice(11,19);
let secondDate = new Date('Mon May 30 2022 13:15:10 GMT-0500') // .slice(0,7);
let tick = (Math.abs(Math.round((secondDate.getTime() - firstDate.getTime())/1000))/60);
console.log(firstDate);
console.log(secondDate);*/
// let ticks = new Date().toLocaleTimeString();
// let time = setInterval(ticks, 1000);

/*let diff_minutes = () =>{

  var diff =(secondDate.getTime() - firstDate.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
 }*/





 const StatusType = () => {
  if (status === 'pending'){
    return (
      <p className={style.pendingStatus}>{status}</p>
    );
  }
  else if (status === 'Ready to serve'){
    return (
      <p className={style.readyStatus}>{status}</p>
    );
  }
  return (
    <p className={style.deliverStatus}>{status}</p>
  );
}



  return (
      <tr>
        <td className={style.rowOrderDashboard}>{id}</td>
        <td className={style.rowOrderDashboard}>{userId}</td>
        <td className={style.rowOrderDashboard}>{client}</td>
        <td className={style.rowOrderDashboard}>{products.map((product)=><p  className={style.listProducts}>{product.qty} - {product.product}</p>)}</td>
        <td className={style.rowOrderDashboard}>{<StatusType/>}</td>
        <td className={style.rowOrderDashboard}>{dateEntry}</td>
        <td className={style.rowOrderDashboard}>{dateProcessed}</td>
        <td className={style.rowOrderDashboard}>
        {!startCounter ? <button className={style.btnStart} type="button" onClick={countTime}>Start</button>: <Timer/>}
        </td>
        <td className={style.rowOrderDashboard}>
        {!startButton ? <button className={style.btnServe} type="button" onClick={handleSubmit}>Ready to serve</button>:<CrudForm
              updateData={updateData}
              dataToEdit={dataToEdit}
        />}
        </td>
      </tr>
  );
};

export default CrudDashboardRow;