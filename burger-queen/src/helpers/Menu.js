import React, { useState, useEffect } from 'react'
import { NewOrder } from './NewOrder'

export default function Menu (prop) {
  const [listOrder, setListOrder] = useState([])
  const [productstoSend, setproductstoSend] = useState([])
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState([])

  async function getResponse (url) {
    const response = await fetch(url)
    return await response.json()
  }

  useEffect(() => {
    getResponse('https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/products').then((json) =>
      setProducts(json)
    )
  }, [])

  function deleteItem (product) {
    let deleteArray = []
    let updateTotal = []
    let updateProductsToSend = []
    deleteArray = listOrder.filter(function (plate) { return plate !== product })
    setListOrder(deleteArray)
    updateTotal = total.filter(function (each) { return each.id !== product.id })
    setTotal(updateTotal)
    updateProductsToSend = productstoSend.filter(function (each) { return each.product !== product.item })
    setproductstoSend(updateProductsToSend)
  }

  function pickingOrder (product) {
    const exists = listOrder.includes(product)
    if (exists) {
      return
    } setListOrder([...listOrder, product])
    const qtyProducts = { qty: 1, product: product.item }
    setproductstoSend([...productstoSend, qtyProducts])
    setTotal([...total, { sub: product.price, id: product.id }])
  }

  return (
    <section >
      <div className='container-menu'>
        {products.filter(product => product.type === `${prop.option}`).map((products) => (
          <section key={products.product} className='container-product' onClick={() => pickingOrder(products)} >
            <img className='menu-img' src={products.img} alt='logo-icon' />
            <p className='menu-description'>
              {products.item} <br /> $ {products.price}
            </p>
          </section>
        ))}
      </div>
      <div className='container-new-order'>
        <NewOrder className='orderForm'
          listOrder={listOrder}
          deleteItem={deleteItem}
          productstoSend={productstoSend}
          setproductstoSend={setproductstoSend}
          setTotal={setTotal}
          total={total}
          setListOrder={setListOrder}
        />
      </div>
    </section>
  )
}
