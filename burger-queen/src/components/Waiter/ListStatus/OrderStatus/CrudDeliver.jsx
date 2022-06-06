import style from './CrudDeliver.module.css'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CrudForm = ({ updateData, dataToEdit }) => {
  CrudForm.propTypes = {
    updateData: PropTypes.object,
    dataToEdit: PropTypes.func.isRequired
  }

  const [form, setForm] = useState({
    status: '',
    dateProcessed: ''
  })

  form.status = 'Deliver'
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
    <div>
    {!startButton ? <button className={style.btnSendWaiter} type='submit' onClick={handleSubmit}>Delivered</button> : <h1>Successful!!</h1> }
    </div>
  )
}

export default CrudForm
