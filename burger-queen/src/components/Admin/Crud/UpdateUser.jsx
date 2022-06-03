import "./../Admin.css";
import { useEffect, useState } from "react";
import Read from "./Read";

export default function UpdateUser(prop) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  function putDataUsers() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, rol }),
    };
    fetch(
      `https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/user/${prop.users.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  
  useEffect( () => {
  setName(document.getElementById('name').value)
  setEmail(document.getElementById('email').value)
  setPassword(document.getElementById('password').value)
  setRol(document.getElementById('rol').value)
  }, [])

  return (
                 <section className="container-show-control-panel">
               
                 <h3 className="titles-control-panel">Edit User</h3>
                 <section className="container-form-new-item">
                            
                   <form className="create-form">
                     <label className="label-form-text">Name</label>
                     <input
                       className="input-form-text"
                       defaultValue={prop.users.name}
                       onChange={(e) => setName(e.target.value)}
                       id = {'name'}
                      />
           
                     <label className="label-form-text">Email</label>
                     <input
                       className="input-form-text"
                       defaultValue={prop.users.email}
                       onChange={(e) => setEmail(e.target.value)}
                       id = {'email'}
                     />
           
                     <label className="label-form-text">Password</label>
                     <input
                       type="password"
                       className="input-form-text"
                       defaultValue={prop.users.password}
                       onChange={(e) => setPassword(e.target.value)}
                       id = {'password'}
                     />
           
                     <label className="label-form-text">Rol</label>
                     <input
                       className="input-form-text"
                       defaultValue={prop.users.rol}
                       onChange={(e) => setRol(e.target.value)}
                       id = {'rol'}
                     />
           
                     <button className="btn-add-item-form" onClick={putDataUsers()}>
                       Update User
                     </button>
                     <button className="btn-return-item-form" onClick={<Read />}>
                       Return
                     </button>
                   </form>
                        
                 </section>
               </section>
  );
}
