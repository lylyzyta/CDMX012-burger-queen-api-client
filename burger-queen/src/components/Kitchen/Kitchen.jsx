import { logout } from '../../lib/firebaseAuth'
import { auth } from '../../lib/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import LogoImage from '../../img/Logo_Image.png'
import React, { useEffect, useState } from 'react'
import { helpHttp } from '../../helpers/helpHttp'
import CrudDashboard from '../Kitchen/ListStatus/OrderDashboard/CrudDashboard'
import Loader from '../Kitchen/ListStatus/Loader'
import Message from '../Kitchen/ListStatus/Message'
import style from '../Kitchen/Kitchen.module.css'

export default function KitchenPage () {
  const navigate = useNavigate()

  const handleClick = async () => {
    await logout(auth)
    navigate('/')
  }

  const [db, setDb] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const url = 'https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/orders'

  useEffect(() => {
    setLoading(true)
    helpHttp()
      .get(url)
      .then((res) => {
        // console.log(res)
        if (!res.err) {
          setDb(res)
          setError(null)
        } else {
          setDb(null)
          setError(res)
        }
        setLoading(false)
      })
  }, [url])

  return (
        <div className={style.containerKitchen}>
         <div className={style.headerKitchen}>
          <img className={style.logoAdmin} src={LogoImage} alt='logo-icon' />
        <button className={style.btnLogout} onClick={handleClick}>
          LogOut
        </button>
            </div>
            <article className={style.boxGeneralKitchen}>
                {loading && <Loader />}
                {error && (
                <Message
                    msg={`Error ${error.status}: ${error.statusText}`}
                    bgColor='#dc3545'
                />
                )}
                {db && (
                <CrudDashboard
              data={db}
              />)}
            </article>
        </div>
  )
}
