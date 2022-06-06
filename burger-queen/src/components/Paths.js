import {
  Routes,
  Route
} from 'react-router-dom'
import React from 'react'
import KitchenPage from './Kitchen/Kitchen'
import LoginPage from './Login/Login'
import WaiterPage from './Waiter/Waiter'
import AdminPage from './Admin/Admin'
import { login, logout } from '../lib/firebaseAuth.js'
import PropTypes from 'prop-types'

export default function Paths ({ isAutenticate }) {
  Paths.propTypes = {
    isAutenticate: PropTypes.func.isRequired
  }
  return (
        <div>
            {isAutenticate
              ? <Routes>
                    <Route path='/' element={<LoginPage login={login}/>} />
                    <Route path='/Waiter' element={<WaiterPage logout={logout} />} />
                    <Route path='/Admin' element={<AdminPage logout={logout} />} />
                    <Route path='/Kitchen' element={<KitchenPage logout={logout} />} />
                </Routes>
              : <Routes>
                    <Route path='/' element={<LoginPage login={login}/>} />
                </Routes> }
        </div>)
}
