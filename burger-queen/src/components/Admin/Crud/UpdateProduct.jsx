import './../Admin.css'
import React, { useEffect, useState } from 'react'
import Read from './Read'

export default function UpdateProduct (prop) {
  const [item, setItem] = useState('')
  const [price, setPrice] = useState('')
  const [img, setImg] = useState('')
  const [type, setType] = useState('')
  const [dateEntry, setDateEntry] = useState('')

  function putDataProducts () {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item, price, img, type, dateEntry })
    }
    fetch(
      `https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/products/${prop.products.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  useEffect(() => {
    setItem(document.getElementById('item').value)
    setPrice(document.getElementById('price').value)
    setImg(document.getElementById('img').value)
    setType(document.getElementById('type').value)
    setDateEntry(document.getElementById('dateEntry').value)
  }, [])

  return (
    <section className='container-show-control-panel'>
      <h3 className='titles-control-panel'>Edit Product</h3>
      <section className='container-form-new-item'>
        <form className='create-form'>
          <label className='label-form-text'>Product</label>
          <input
            className='input-form-text'
            defaultValue={prop.products.item}
            onChange={(e) => setItem(e.target.value)}
            id={'item'}
          />

          <label className='label-form-text'>Price</label>
          <input
            className='input-form-text'
            defaultValue={prop.products.price}
            onChange={(e) => setPrice(e.target.value)}
            id={'price'}
          />

          <label className='label-form-text'>Img</label>
          <input
            className='input-form-text'
            defaultValue={prop.products.img}
            onChange={(e) => setImg(e.target.value)}
            id={'img'}
          />

          <label className='label-form-text'>Type</label>
          <input
            className='input-form-text'
            defaultValue={prop.products.type}
            onChange={(e) => setType(e.target.value)}
            id={'type'}
          />
          <label className='label-form-text'>DateEntry</label>
          <input
            className='input-form-text'
            defaultValue={prop.products.dateEntry}
            onChange={(e) => setDateEntry(e.target.value)}
            id={'dateEntry'}
          />

          <button className='btn-add-item-form' onClick={putDataProducts()}>
            Update Product
          </button>
          <button className='btn-return-item-form' onClick={<Read />}>
            Return
          </button>
        </form>
      </section>
    </section>
  )
}
