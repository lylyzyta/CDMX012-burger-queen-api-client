import React from 'react'
import CrudTableRow from './CrudTableRow'
import style from '../OrderStatus/CrudTable.module.css'
import PropTypes from 'prop-types'

const CrudTable = ({ data, setEditOrder, deleteData }) => {
  CrudTable.propTypes = {
    data: PropTypes.array,
    setEditOrder: PropTypes.func.isRequired,
    deleteData: PropTypes.func.isRequired
  }

  return (
    <div className={style.containerOrderStatus}>
      <header className={style.headerTable}>
        <h3 className={style.titleTable}>Orders Status</h3>
      </header>
      <table className={style.table}>
        <thead className={style.headTable}>
          <tr className={style.columns}>
            <th className={style.titleColumns}>Num. Order</th>
            <th className={style.titleColumns}>Client</th>
            <th className={style.titleColumns}>Status</th>
            <th className={style.titleColumns}>Date Processed</th>
            <th className={style.titleColumns}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0
            ? (
                data.map((el) => (
              <CrudTableRow
                key={el.id}
                el={el}
                setEditOrder={setEditOrder}
                deleteData={deleteData}
              />
                ))
              )
            : (
            <tr>
              <td colSpan='3'>Sin datos</td>
            </tr>
              )}
        </tbody>
      </table>
    </div>
  )
}

export default CrudTable
