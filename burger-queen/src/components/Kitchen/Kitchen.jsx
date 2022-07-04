import React, { useState, useEffect } from 'react'
import style from '../Kitchen/Kitchen.module.css'
import LogoImage from '../../img/Logo_Image.png'
import { logout } from '../../lib/firebaseAuth'
import { auth } from '../../lib/firebaseConfig'
import { useNavigate } from 'react-router-dom'

export default function ReadOrders () {
  const navigate = useNavigate()
  const [listOrders, setListOrders] = useState([])
  const [updateStatus, setUpdateStatus] = useState('')
  const handleClick = async () => {
    await logout(auth)
    navigate('/')
  }

  async function getResponse (url) {
    const response = await fetch(url)
    return await response.json()
  }

  useEffect(() => {
    getResponse('https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/orders').then((json) =>
      setListOrders(json)
    )
  }, [updateStatus])

  function handleSubmit (orders) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Ready to serve' })
    }
    fetch(
      `https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/orders/${orders.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setUpdateStatus(data))
  }
  return (
    <div className={style.containerKitchen}>
         <div className={style.headerKitchen}>
          <img className={style.logoAdmin} src={LogoImage} alt='logo-icon' />
        <button className={style.btnLogout} onClick={handleClick}>
          LogOut
        </button>
        </div>
      <section className={style.boxGeneralKitchen}>
         <h3 className={style.titlesKitchePanel}>Orders</h3>
            <table className={style.dataKitchePanel}>
            <thead>
              <tr>
                <th className={style.columnKitchenPanel}>Order Number</th>
                <th className={style.columnKitchenPanel}>Status</th>
                <th className={style.columnKitchenPanel}>Products</th>
                <th className={style.columnKitchenPanel}>Actions</th>
              </tr>
            </thead>
            {listOrders.map((orders) => (
                <tr key={orders.id}>
                <td className={style.rowKitchenPanel}>{orders.userID}</td>
                <td className={style.rowKitchenPanel}>{orders.status} </td>
                <td className={style.rowKitchenPanel}>
                 {orders.products.map((element) => (
                 <tr key={element.id}>
                 <td className={style.rowProductsKitchenPanel}>{element.qty}</td>
                 <td className={style.rowProductsKitchenPanel}>{element.product}</td>
                 </tr>
                 ))}
                 </td>
                 <td className={style.rowKitchenPanel}>
                 <button key={orders.id} className={style.btnOptionPanel} type='buton' onClick={() => handleSubmit(orders)}>Ready to serve</button>
                </td>
                 </tr>
            ))}           </table>
       </section>
       </div>
  )
}
