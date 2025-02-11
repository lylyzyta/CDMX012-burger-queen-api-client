import { useNavigate } from 'react-router-dom'
import './Login.css'
import LogoImage from '../../img/Logo_Image.png'
import emailIcon from '../../img/emailIcon.svg'
import passwordIcon from '../../img/passwordIcon.svg'
import React, { useState } from 'react'
import { login } from '../../lib/firebaseAuth'

export default function LoginPage () {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState()
  const navigate = useNavigate()

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      const currentmail = user.email
      if (currentmail.includes('wait')) {
        navigate('/Waiter')
      } else if (currentmail.includes('admin')) {
        navigate('/Admin')
      } else if (currentmail.includes('cook')) {
        navigate('/Kitchen')
      // eslint-disable-next-line no-constant-condition
      } else if (currentmail[0] !== 'w' || 'a' || 'c') {
        setError('Error, Please contact the administrator')
      }
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        console.log(error.code)
        setError('Invalid email')
      } else if (error.code === 'auth/wrong-password') {
        console.log(error.code)
        setError('Invalid password')
      } else if (error.code === 'auth/internal-error') {
        console.log(error.code)
        setError('Enter a password')
      } else if (error.code === 'auth/user-not-found') {
        console.log(error.code)
        setError('User not found')
      }
    }

    // async function getResponse () {
  /*   const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        email: 'jose@gmail.com',
        password: '123456'
      })
    }
    fetch(
      'http://localhost:8080/auth', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data, 'soy DATAAAAA')) */
  }

  return (
       <div className='container-login'>

            <form className='register-container' >
            <img className='logo-icon' src={LogoImage} alt='logo-icon' />
                <h1 className='title-h1'> Welcome!</h1>
                <h3 className='title-h3'>Login to your account</h3>
                <div className='box-form'>
                    <img className='icon' src={emailIcon} alt='email-icon' />
                    <input
                        className='input-form'
                        type='email'
                        name='email'
                        placeholder='email@example.com'
                        onChange={handleChange}
                    />
                </div>
                <div className='box-form'>
                    <img className='icon' src={passwordIcon} alt='password-icon' />
                    <input
                        className='input-form'
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Password...'
                        onChange={handleChange}
                    />
                </div>
                <button type='button' className='btn-form' onClick={handleSubmit}> Login</button>
                <div className='title-error'>{error && <p>{error}</p>}</div>
            </form>
        </div>
  )
}
