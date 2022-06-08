import style from './CrudForm.module.css'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CrudForm = ({ updateData, dataToEdit }) => {
  CrudForm.propTypes = {
    updateData: PropTypes.object,
    dataToEdit: PropTypes.object
  }
  const [form, setForm] = useState({
    status: '',
    dateProcessed: ''
  })

  form.status = 'Ready to serve'
  form.dateProcessed = new Date().toLocaleTimeString()

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit)
    }
  }, [dataToEdit])

  const [startButton, setStartButton] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateData(form)
    setStartButton(true)
  }

  return (
    <div className={style.sendWaiter}>
    {!startButton ? <button className={style.btnSendWaiter} type='submit' onClick={handleSubmit}>Send to waiter</button> : <h1 className={style.titleSendWaiter}>Successful!!</h1> }
    </div>
  )
}

export default CrudForm
