import React, { useState, useEffect } from 'react'
import { helpHttp } from '../../../../helpers/helpHttp'
import CrudDeliver from './CrudDeliver'
import editIcon from '../../../../img/OrderStatus/editOrders.svg'
import deleteIcon from '../../../../img/OrderStatus/deleteOrders.svg'
import sendIcon from '../../../../img/OrderStatus/deliveredIcons.svg'
import style from './CrudTableRow.module.css'
import PropTypes from 'prop-types'

const CrudTableRow = ({ el, deleteData, setEditOrder }) => {
  CrudTableRow.propTypes = {
    el: PropTypes.object,
    deleteData: PropTypes.func.isRequired,
    setEditOrder: PropTypes.func.isRequired
  }
  const { id, client, status, dateProcessed } = el

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
    if (status === 'pending') {
      return (
        <p className={style.pendingStatus}>{status}</p>
      )
    } else if (status === 'Ready to serve') {
      return (
        <p className={style.readyStatus}>{status}</p>
      )
    }
    return (
      <p className={style.deliverStatus}>{status}</p>
    )
  }

  return (
    <tr>
      <td className={style.rowOrderDashboard}>{id}</td>
      <td className={style.rowOrderDashboard}>{client}</td>
      <td className={style.rowOrderDashboard}>{<StatusType />}</td>
      <td className={style.rowOrderDashboard}>{dateProcessed}</td>
      <td className={style.rowOrderDashboard}>
        {status !== 'Deliver'
          ? <div className={style.containerbtnStatus}>
            <button className={style.btnStatus} onClick={() => setEditOrder(el)}>
              <img className={style.icon} src={editIcon} alt='edit-icon' />
            </button>
            <button className={style.btnStatus} onClick={() => deleteData(id)}>
              <img className={style.icon} src={deleteIcon} alt='delete-icon' />
            </button>
            {!startButton
              ? <button className={style.btnStatus} type='button' onClick={handleSubmit}>
                <img className={style.icon} src={sendIcon} alt='delete-icon' /></button>
              : <CrudDeliver
                updateData={updateData}
                dataToEdit={dataToEdit}
              />}
          </div>
          : ''}
      </td>

    </tr>
  )
}

export default CrudTableRow
