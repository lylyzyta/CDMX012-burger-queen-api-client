import "./../Admin.css";
import { useState } from "react";
import Read from "./Read";

export default function CreateNewUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [rol, setRol] = useState();

  function postDataUsers() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, rol }),
    };
    fetch(
      "https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/user",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className="container-show-control-panel">
      <h3 className="titles-control-panel">Add New User</h3>
      <section className="container-form-new-item">
        <form className="create-form">
          <label className="label-form-text">Name</label>
          <input
            className="input-form-text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label-form-text">Email</label>
          <input
            className="input-form-text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label-form-text">Password</label>
          <input
            type="password"
            className="input-form-text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="label-form-text">Rol</label>
          <input
            className="input-form-text"
            placeholder="rol"
            onChange={(e) => setRol(e.target.value)}
          />

          <button className="btn-add-item-form" onClick={postDataUsers}>
            Add User
          </button>
          <button className="btn-return-item-form" onClick={<Read />}>
            Return
          </button>
        </form>
             
      </section>
    </section>
  );
}
