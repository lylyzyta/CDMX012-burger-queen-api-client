import { useEffect, useState } from "react"
import "./NewOrder.css";
import { sendOrder } from "./sendNewOrder";


const NewOrder = ({ product, deleteItem, productstoSend, setproductstoSend }) => {

  //Fecha
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const month = today.getMonth() + 1
  const day = today.getDate();
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const shortDate = day + "/" + month + "/" + year;
  const time = hours + ":" + minutes

  useEffect(() => {

  }, [])

  

  const sum = (e) => {
    const updateProduct = []
    document.getElementById(e.id).textContent = parseInt(document.getElementById(e.id).textContent) + 1;
    document.getElementById(e.id + "price").textContent = "$ " + document.getElementById(e.id).textContent * e.price;
    const qtyArray = { qty: parseInt(document.getElementById(e.id).textContent), product: e.item }
    for (product of productstoSend) {
      if (product.product === e.item) {
        updateProduct.push(qtyArray)
      } else {
        updateProduct.push(product)
      }
    }
    setproductstoSend(updateProduct)
  }



  const rest = (e) => {
    const updateProduct = []
    document.getElementById(e.id).textContent = parseInt(document.getElementById(e.id).textContent) - 1;
    const qtyArray = { qty: parseInt(document.getElementById(e.id).textContent), product: e.item }
    for (product of productstoSend) {
      if (product.product === e.item) {
        updateProduct.push(qtyArray)
      } else {
        updateProduct.push(product)
      }
    }
    setproductstoSend(updateProduct)
  }







  const initialForm = {
    id: day + time,
    userId: "waiter",
    client: 1 + day + time,
    products: productstoSend,
    status: "pending",
    dateEntry: time,
    dateProcessed: shortDate,
  };





  function sendToKitchen() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initialForm)
    };
    fetch('https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/orders', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))

  }

  return (
    <div className="orderForm" >


      <form action="">
        <p className="plusItems">Table</p>
        <input type={"number"} id="table" className="offset" min={1} max={8} defaultValue={1} />
        {product.map((each) => (

          <div className="row" key={each.item}>{ }
            <button type="button" onClick={() => sum(each)} className="sumButton" >+</button>
            <p className="qty" id={each.id} >1</p>
            <button type="button" onClick={() => rest(each)} className="sumButton" >-</button>
            <p className="plusItems" >{each.item}</p>
            <p className="plusItems" > $ {each.price}</p>
            <p className="subtotal" id={each.id + "price"} >$ {each.price}</p>
            <p className="deleteButton" onClick={() => deleteItem(each)} >Borrar</p>

          </div>

        ))}
        <button type="button" className="sumButton" onClick={() => sendToKitchen()}>Kitchen</button>

      </form>



    </div>
  )

}





export {
  NewOrder,

}