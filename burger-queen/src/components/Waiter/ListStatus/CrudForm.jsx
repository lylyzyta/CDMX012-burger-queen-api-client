import React, { useState, useEffect } from 'react'
import style from './CrudForm.module.css'
import PropTypes from 'prop-types'

const initailForm = {
  userId: '',
  client: '',
  status: '',
  products: [
    {
      qty: '',
      product: ''
    }
  ],
  dateEntry: '',
  dateProcessed: '',
  id: null
}

const CrudForm = ({ createData, updateData, editOrder, setEditOrder }) => {
  CrudForm.propTypes = {
    createData: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
    editOrder: PropTypes.object,
    setEditOrder: PropTypes.func.isRequired
  }
  const [formNewOrder, setFormNewOrder] = useState(initailForm)
  useEffect(() => {
    if (editOrder) {
      setFormNewOrder(editOrder)
    } else {
      setFormNewOrder(initailForm)
    }
  }, [editOrder])

  const handleChange = (e) => {
    console.log(e.target.name)
    setFormNewOrder({
      ...formNewOrder,
      [e.target.name]: e.target.value,
      products: [
        { [e.target.name]: e.target.value }
      ]
    })
    console.log(formNewOrder)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formNewOrder.userId || !formNewOrder.client || !formNewOrder.status || !formNewOrder.dateEntry || !formNewOrder.dateProcessed) {
      alert('Datos incompletos')
      return
    }

    if (formNewOrder.id === null) {
      createData(formNewOrder)
    } else {
      updateData(formNewOrder)
    }

    handleReset()
  }

  const handleReset = (e) => {
    setFormNewOrder(initailForm)
    setEditOrder(null)
  }

  return (
    <div className={style.containerFormStatus}>
      <h3 className={style.titleTable}>{editOrder ? 'Edit Order' : 'Edit Order'}</h3>
      <h3 className={style.titleForm}>Order Form</h3>
      <div key={formNewOrder.id}>
      <form className={style.form} onSubmit={handleSubmit}>
      <section className={style.boxForm}>
      <label className={style.labelForm}> Order Id:  </label>
      <input className={style.inputForm}
          type='text'
          name='id'
          placeholder='Order id'
          onChange={handleChange}
          defaultValue={formNewOrder.id}
        />

      <label className={style.labelForm}> User Id: </label>
        <input className={style.inputForm}
          type='text'
          name='userId'
          placeholder='User Id'
          onChange={handleChange}
          defaultValue={formNewOrder.userId}
        />

        <label className={style.labelForm}> Client:</label>
        <input className={style.inputForm}
          type='text'
          name='client'
          placeholder='Client'
          onChange={handleChange}
          defaultValue={formNewOrder.client}
        />

      <label className={style.labelForm}> Status:</label>
      <input className={style.inputForm}
          type='text'
          name='status'
          placeholder='Status'
          onChange={handleChange}
          defaultValue={formNewOrder.status}
        />

        <label className={style.labelForm}> Date Entry:
        </label>
        <input className={style.inputForm}
          type='text'
          name='dateEntry'
          placeholder='Date Entry'
          onChange={handleChange}
          defaultValue={formNewOrder.dateEntry}
        />
        <label className={style.labelForm}> Date Processed:</label>
        <input className={style.inputForm}
          type='text'
          name='dateProcessed'
          placeholder='Date Processed'
          onChange={handleChange}
          defaultValue={formNewOrder.dateProcessed}
        />

        {formNewOrder.products && formNewOrder.products.map((product) =>
          <div key={product.id}>
          <label className={style.labelForm}> Quantity: </label>
          <input className={style.inputForm}
                type='text'
                name={product.qty}
                placeholder='Quantity'
                onChange={handleChange}
                defaultValue={product.qty} />

          <label className={style.labelForm}> Product:
          </label>
          <input className={style.inputForm}
              type='text'
              name='product'
              placeholder='Product'
              onChange={handleChange}
              defaultValue={product.product} />

          </div>
        )}
          <section className={style.btnAccions}>
          <input className={style.btnForm} type='submit' value='Send Order' />
          <input className={style.btnForm} type='reset' value='Clean Form' onClick={handleReset} />
        </section>
        </section>
      </form>
      </div>
     </div>
  )
}

export default CrudForm
