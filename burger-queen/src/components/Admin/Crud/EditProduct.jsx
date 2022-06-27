import React from 'react'
import './EditProduct.css'

export default function EditProduct (user) {
  console.log(user.name, 'npombre')

  function postDataUsers () {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }
    fetch(
      'https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/${user.id}',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
  }
  function update () {

  }

  return (

        <form className='editForm' action=''>
            <p className='userId'>{user.id}</p>{console.log(user, 'dentro')}
            <input className='editSection' type='text' defaultValue={user.name} onChange={update()} />
            <input className='editSection' type='text' defaultValue={user.email} />
            <input className='editSection' type='text' defaultValue={user.password} />
            <input className='editSection' type='text' defaultValue={user.rol} />
        </form>
  )
}
