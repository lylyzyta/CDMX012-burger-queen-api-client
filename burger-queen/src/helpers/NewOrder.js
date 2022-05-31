import { useEffect, useState } from "react"
import "./NewOrder.css";



const NewOrder = ({ product, deleteItem, productstoSend, setproductstoSend, setTotal, total }) => {

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





  const sum = (e) => {
    const updateProduct = []
    const updatePrice = []
    document.getElementById(e.id).textContent = parseInt(document.getElementById(e.id).textContent) + 1;
    document.getElementById(e.id + "price").textContent = "$ " + document.getElementById(e.id).textContent * e.price;
    const subtotal = { sub: document.getElementById(e.id).textContent * e.price, id: e.id }
    const qtyArray = { qty: parseInt(document.getElementById(e.id).textContent), product: e.item }
    for (product of productstoSend) {
      if (product.product === e.item) {
        updateProduct.push(qtyArray)
      } else {
        updateProduct.push(product)
      }
    }
    setproductstoSend(updateProduct)
    for (let sub of total) {
      if (sub.id === e.id) {
        updatePrice.push(subtotal)
      } else {
        updatePrice.push(sub)
      }
    }
    setTotal(updatePrice)

  }
const [totalPrices, setTotalPrices]= useState(0)
  useEffect(()=>{
    const totalArray = []
    total.map((each) => {
      totalArray.push(each.sub);
    })
     setTotalPrices(totalArray.reduce((a, b) => a + b, 0))
  }, [total])
  


  const rest = (e) => {
    const updateProduct = []
    const updatePrice = []
    document.getElementById(e.id).textContent = parseInt(document.getElementById(e.id).textContent) - 1;
    document.getElementById(e.id + "price").textContent = "$ " + document.getElementById(e.id).textContent * e.price;
    const subtotal = { sub: document.getElementById(e.id).textContent * e.price, id: e.id }
    const qtyArray = { qty: parseInt(document.getElementById(e.id).textContent), product: e.item }
    for (product of productstoSend) {
      if (product.product === e.item) {
        updateProduct.push(qtyArray)
      } else {
        updateProduct.push(product)
      }
    }
    setproductstoSend(updateProduct)
    for (let sub of total) {
      if (sub.id === e.id) {
        updatePrice.push(subtotal)
      } else {
        updatePrice.push(sub)
      }
    }
    setTotal(updatePrice)
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
       <div className="total">
       <button type="button" className="sumButton" onClick={() => sendToKitchen()}>Kitchen</button>
       <p className="plusItems" >  TOTAL $ {totalPrices}</p>
       </div>
      </form>



    </div>
  )

}





export {
  NewOrder,

}