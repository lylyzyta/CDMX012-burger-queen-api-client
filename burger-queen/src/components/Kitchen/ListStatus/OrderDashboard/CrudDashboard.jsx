import React from 'react'
import CrudDashboardRow from './CrudDashboardRow'
import style from './CrudDashboard.module.css'
import PropTypes from 'prop-types'

const CrudDashboard = ({ data, setDataToEdit }) => {
  CrudDashboard.propTypes = {
    data: PropTypes.array,
    setDataToEdit: PropTypes.func.isRequired
  }
  return (
    <div className={style.containerOrderHistoryKitchen}>
      <h3 className={style.titleTable}>Orders History</h3>
      <table className={style.table}>
        <thead className={style.headTable}>
          <tr className={style.columns}>
            <th className={style.titleColumns}>Num. Order</th>
            <th className={style.titleColumns}>User Id</th>
            <th className={style.titleColumns}>Client</th>
            <th className={style.titleColumns}>Products</th>
            <th className={style.titleColumns}>Status</th>
            <th className={style.titleColumns}>Date Entry</th>
            <th className={style.titleColumns}>Date Processed</th>
            <th className={style.titleColumns}>Time Preparing</th>
            <th className={style.titleColumns}>Accions</th>
          </tr>
        </thead>
        <tbody>
          { data.length > 0
            ? (
                data.map((el) => (
               <CrudDashboardRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
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

export default CrudDashboard
