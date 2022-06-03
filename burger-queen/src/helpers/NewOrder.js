import { useEffect, useState } from 'react'
import './NewOrder.css';

const NewOrder = ({ product, deleteItem, productstoSend, setproductstoSend, setTotal, total, setListOrder }) => {
  const [table, setTable] = useState(1)
  //Fecha
  const timeAndDate = Date.now();
  const today = new Date(timeAndDate);
  const month = today.getMonth() + 1
  const day = today.getDate();
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const shortDate = day + '/' + month + '/' + year;
  const time = hours + ':' + minutes
  //agrega cantidad a los productos
  const sum = (e) => {
    const updateProduct = []
    const updatePrice = []
    document.getElementById(e.id).textContent = parseInt(document.getElementById(e.id).textContent) + 1;
    document.getElementById(e.id + 'price').textContent = '$ ' + document.getElementById(e.id).textContent * e.price;
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
  //el $ total de la orden
  const [totalPrices, setTotalPrices] = useState(0)
  useEffect(() => {
    const totalArray = []
    total.map((each) => {
      totalArray.push(each.sub);
    })
    setTotalPrices(totalArray.reduce((a, b) => a + b, 0))
  }, [total])

  // quita productos a la órden
  const rest = (e) => {
    const updateProduct = []
    const updatePrice = []
    document.getElementById(e.id).textContent = parseInt(document.getElementById(e.id).textContent) - 1;
    document.getElementById(e.id + 'price').textContent = '$ ' + document.getElementById(e.id).textContent * e.price;
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
  function changeTable(e) {
    setTable(e.target.value)
  }

  //órden a mandar

  const initialForm = {
    id: table + ' at ' + time,
    userId: 'waiter',
    client: table,
    products: productstoSend,
    status: 'pending',
    dateEntry: time,
    timeEntry: time,
    dateProcessed: shortDate,
  };
  //manda la órden a cocina
  function sendToKitchen() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initialForm)
    };
    fetch('https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/orders', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
    alert('Sent to Kitchen')
    setListOrder([])
    setproductstoSend([])
    setTotal([])
    setTable(1)
  }





  return (
    <div className='orderForm' >
      <p className='plusItems'>Table</p>
      <input type='number' id='table' className='offset' min={1} max={8} defaultValue={1} onChange={changeTable} />
      {product.map((each) => (
        <div className='row' key={each.item}>{ }
          <button type='button' onClick={() => sum(each)} className='sumButton' >+</button>
          <p className='qty' id={each.id} >1</p>
          <button type='button' onClick={() => rest(each)} className='sumButton' >-</button>
          <p className='plusItems' >{each.item}</p>
          <p className='plusItems' > $ {each.price}</p>
          <p className='subtotal' id={each.id + 'price'} >$ {each.price}</p>
          <button className='deleteButton' type='button' onClick={() => deleteItem(each)} >Clear</button>
        </div>
      ))}
      <div className='total'>
        <button type='button' className='downButton' onClick={() => sendToKitchen()}>Kitchen</button>
        <p className='plusItems' >  TOTAL $ {totalPrices}</p>
        <button type='button' id='cancelOrder' className='downButton' onClick={() => {
          setListOrder([])
          setproductstoSend([])
          setTotal([])
          setTable(1)
        }
        }>
          Cancel Order
        </button>
      </div>
    </div>
  )
}

export {
  NewOrder,

}