import React, { useEffect, useState } from 'react'
import './NewOrder.css'
import PropTypes from 'prop-types'

const NewOrder = ({ listOrder, deleteItem, productstoSend, setproductstoSend, setTotal, total, setListOrder }) => {
  NewOrder.propTypes = {
    listOrder: PropTypes.array,
    deleteItem: PropTypes.func.isRequired,
    productstoSend: PropTypes.array,
    setproductstoSend: PropTypes.func.isRequired,
    setTotal: PropTypes.func.isRequired,
    total: PropTypes.array,
    setListOrder: PropTypes.func.isRequired
  }
  const [table, setTable] = useState(1)
  // Fecha
  const timeAndDate = Date.now()
  const today = new Date(timeAndDate)
  const month = today.getMonth() + 1
  const day = today.getDate()
  const year = today.getFullYear()
  const hours = today.getHours()
  const minutes = today.getMinutes()
  const shortDate = day + '/' + month + '/' + year
  const time = hours + ':' + minutes
  // agrega cantidad a los productos
  const sum = (e) => {
    const updateProduct = []
    const updatePrice = []
    document.getElementById(e.id).textContent = parseInt(document.getElementById(e.id).textContent) + 1
    document.getElementById(e.id + 'price').textContent = '$ ' + document.getElementById(e.id).textContent * e.price
    const subtotal = { sub: document.getElementById(e.id).textContent * e.price, id: e.id }
    const qtyArray = { qty: parseInt(document.getElementById(e.id).textContent), product: e.item }
    for (const product of productstoSend) {
      if (product.product === e.item) {
        updateProduct.push(qtyArray)
      } else {
        updateProduct.push(product)
      }
    }
    setproductstoSend(updateProduct)
    for (const sub of total) {
      if (sub.id === e.id) {
        updatePrice.push(subtotal)
      } else {
        updatePrice.push(sub)
      }
    }
    setTotal(updatePrice)
  }
  // el $ total de la orden
  const [totalPrices, setTotalPrices] = useState(0)
  useEffect(() => {
    const totalArray = []
    total.forEach(each => {
      totalArray.push(each.sub)
    })
    setTotalPrices(totalArray.reduce((a, b) => a + b, 0))
  }, [total])

  // quita productos a la órden
  const rest = (e) => {
    const updateProduct = []
    const updatePrice = []
    document.getElementById(e.id).textContent = parseInt(document.getElementById(e.id).textContent) - 1
    document.getElementById(e.id + 'price').textContent = '$ ' + document.getElementById(e.id).textContent * e.price
    const subtotal = { sub: document.getElementById(e.id).textContent * e.price, id: e.id }
    const qtyArray = { qty: parseInt(document.getElementById(e.id).textContent), product: e.item }
    for (const product of productstoSend) {
      if (product.product === e.item) {
        updateProduct.push(qtyArray)
      } else {
        updateProduct.push(product)
      }
    }
    setproductstoSend(updateProduct)
    for (const sub of total) {
      if (sub.id === e.id) {
        updatePrice.push(subtotal)
      } else {
        updatePrice.push(sub)
      }
    }
    setTotal(updatePrice)
  }
  function changeTable (e) {
    setTable(e.target.value)
  }

  // órden a mandar

  const initialForm = {
    id: table + ' at ' + time,
    userId: 'waiter',
    client: table,
    products: productstoSend,
    status: 'pending',
    dateEntry: time,
    timeEntry: time,
    dateProcessed: shortDate
  }
  // manda la órden a cocina
  function sendToKitchen () {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initialForm)
    }
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
        <div className='total'>
        <button type='button' className='downButton' onClick={() => sendToKitchen()}>Kitchen</button>
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
      <p className='plusItems'>Table</p>
      <input type='number' id='table' className='offset' min={1} max={8} defaultValue={1} onChange={changeTable} />
      <p className='plusItems' >  TOTAL $ {totalPrices}</p>
      {listOrder.map((each) => (
        <tr className='row' key={each.item}>{ }
          <td onClick={() => sum(each)} className='sumButton' >+</td>
          <td className='qty' id={each.id} >1</td>
          <td onClick={() => rest(each)} className='sumButton' >-</td>
          <td className='plusItems' >{each.item}</td>
          <td className='plusItems' > $ {each.price}</td>
          <td className='subtotal' id={each.id + 'price'} >$ {each.price}</td>
          <td className='deleteButton' onClick={() => deleteItem(each)} >Clear</td>
        </tr>
      ))}

    </div>
  )
}

export {
  NewOrder
}
