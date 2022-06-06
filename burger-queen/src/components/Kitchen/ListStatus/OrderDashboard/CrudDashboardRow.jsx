import React, { useState, useEffect } from 'react'
import Timer from '../cronometro/timer'
import { helpHttp } from '../../../../helpers/helpHttp'
import CrudForm from './CrudForm'
import style from './CrudDashboardRow.module.css'
import PropTypes from 'prop-types'

const CrudDashboardRow = ({ el }) => {
  CrudDashboardRow.propTypes = {
    el: PropTypes.array
  }
  const [startCounter, setStartCounter] = useState(false)

  const countTime = () => {
    console.log('funciona')
    setStartCounter(true)
  }

  const [db, setDb] = useState(null)
  const [dataToEdit, setDataToEdit] = useState(null)

  const api = helpHttp()
  const url = 'https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/orders'

  useEffect(() => {
    helpHttp()
      .get(url)
      .then((res) => {
        // console.log(res)
        if (!res.err) {
          setDb(res)
        } else {
          setDb(null)
        }
      })
  }, [url])

  const [startButton, setStartButton] = useState(false)

  const handleSubmit = () => {
    setDataToEdit(el)
    console.log('funciona')
    setStartButton(true)
  }

  const updateData = (data) => {
    const endpoint = `${url}/${data.id}`
    // console.log(endpoint)

    const options = {
      body: data,
      headers: { 'content-type': 'application/json' }
    }

    api.put(endpoint, options).then((res) => {
    // console.log(res)
      if (!res.err) {
        const newData = db.map((el) => (el.id === data.id ? data : el))
        setDb(newData)
      }
    })
  }

  const StatusType = () => {
    if (el.status === 'pending') {
      return (
      <p className={style.pendingStatus} > {el.status}</p>
      )
    } else if (el.status === 'Ready to serve') {
      return (
      <p className={style.readyStatus}>{el.status}</p>
      )
    }
    return (
    <p className={style.deliverStatus}>{el.status}</p>
    )
  }

  return (
      <tr>
        <td className={style.rowOrderDashboard}>{el.id}</td>
        <td className={style.rowOrderDashboard}>{el.userId}</td>
        <td className={style.rowOrderDashboard}>{el.client}</td>
        <td className={style.rowOrderDashboard}>{el.products.map((product) => <p key={product.product} className={ style.listProducts }>{product.qty} - {product.product}</p>)}</td>
        <td className={style.rowOrderDashboard}>{<StatusType/>}</td>
        <td className={style.rowOrderDashboard}>{el.dateEntry}</td>
        <td className={style.rowOrderDashboard}>{el.dateProcessed}</td>
        <td className={style.rowOrderDashboard}>
        {el.status === 'pending'
          ? <div>
        {!startCounter ? <button className={style.btnStart} type='button' onClick={countTime}>Start</button> : <Timer/>}
        </div>
          : ''}
        </td>
        <td className={style.rowOrderDashboard}>
        {el.status !== 'Deliver'
          ? <div>
        {!startButton
          ? <button className={style.btnServe} type='button' onClick={handleSubmit}>Ready to serve</button>
          : <CrudForm
              updateData={updateData}
              dataToEdit={dataToEdit}
        /> }
        </div>
          : ''}
        </td>
      </tr>
  )
}

export default CrudDashboardRow
