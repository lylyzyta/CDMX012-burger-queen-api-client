import "./../Admin.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../lib/firebaseConfig";
import { logout } from "../../../lib/firebaseAuth";
import editIcon from "../../../img/OrderStatus/editOrder.svg";
import deleteIcon from "../../../img/OrderStatus/deleteOrder.svg";
import { useState, useEffect } from "react";
import CreateNewUser from "./CreateNewUser";
//import CreateNewProduct from "./CreateNewProduct";
import UpdateUser from "./UpdateUser";


export default function Read(prop) {
  let url = "";
  if (prop.option === "user") {
    url = "https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/user";
  } else if (prop.option === "products") {
    url = "https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/products";
  }

  const navigate = useNavigate();

  const handleClick = async () => {
    await logout(auth);
    navigate("/");
  };

  const [renderOptions, setRenderOptions] = useState(true);
  //const [renderForm, setRenderForm] = useState(true);

  const [listitem, setListItem] = useState([]);

  

  async function getResponse(url) {
    const response = await fetch(url);
    return await response.json();
  }

  useEffect(() => {
    getResponse(url).then((json) => setListItem(json));
  }, [url]);

  function deleteUsers(users) {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el usuario '${users.name}'?`
    );
    if (isDelete) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/user/${users.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data.name));
      let newTable = listitem.filter((db) => db.name !== users.name);
      setListItem(newTable);
    }else {
        return;
      }
  }

  function deleteProduct(products) {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el producto '${products.item}'?`
    );
    if (isDelete) {
       const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/products/${products.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data.name));
    }else {
      return;
    }
  }
  
/*   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [rol, setRol] = useState();

  function putDataUsers() {
   
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, rol }),
    };
    fetch(
      "https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/user",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  } */

  return (
    <div>
      {" "}
      {renderOptions ? (
        url === "https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/user" ? (
          <section className="container-show-control-panel">
            <h3 className="titles-control-panel">Users List</h3>
            <button
                type="button"
                className="btn-add-item"
                value="adduser"
                onClick={() => setRenderOptions(false)}
              >
                Add New User
              </button>
             <table className="data-control-panel" >
              <thead>
                <tr>
                  <th className="column-control-panel">Name</th>
                  <th className="column-control-panel">Email</th>
                  <th className="column-control-panel">Password</th>
                  <th className="column-control-panel">Rol</th>
                  <th className="column-control-panel">Edit</th>
                  <th className="column-control-panel">Delete</th>
                </tr>
              </thead>

              {listitem.map((users) => (
              <>  <tr>
                  <td className="row-control-panel">{users.name}</td>
                  <td className="row-control-panel">{users.email}</td>
                  <td className="row-control-panel">{users.password}</td>
                  <td className="row-control-panel">{users.rol}</td>
                  <td className="row-control-panel">
                    <img
                      className="icon-edit"
                      src={editIcon}
                      alt="edit-icon"
                      onClick={() => setRenderOptions(false)}
                    />
                  </td>
                  <td className="row-control-panel">
                    <img
                      className="icon-delete"
                      src={deleteIcon}
                      alt="delete-icon"
                      value={users.id}
                      onClick={() => deleteUsers(users)}
                    />
                  </td>
                  
                  </tr> 
                 
             
                    {/* <tr>   
                   <td className="row-control-panel">
                   <input
                      className="input-form-text"
                      placeholder={users.name}
                      onChange={(e) => setName(e.target.value)}/></td>
                       <td className="row-control-panel">
                    <input
                     className="input-form-text"
                      placeholder={users.email}
                      onChange={(e) => setEmail(e.target.value)}/></td>
                        <td className="row-control-panel">
                    <input
                     className="input-form-text"
                      placeholder={users.password}
                      onChange={(e) => setPassword(e.target.value)}/></td>
                         <td className="row-control-panel">
                    <input
                     className="input-form-text"
                      placeholder={users.rol}
                      onChange={(e) => setRol(e.target.value)}/></td>
                       <td colspan="2" className="row-control-panel">
                       <button className="btn-put-item" onClick={putDataUsers}>
            GUARDAR
          </button>
                  </td>
                  

                 </tr> */}
                     
                 </>
              
                
              ))} 
              </table>  
             
           
          </section>
        ) : (
          <section className="container-show-control-panel">
            <h3 className="titles-control-panel">Product List</h3>
            <button
                type="button"
                className="btn-add-item"
                value="addproduct"
                onClick={() => setRenderOptions(false)}
              >
                Add New Product
              </button>
            <table  className="data-control-panel">
              <thead>
                <tr>
                  <th className="column-control-panel">Id</th>
                  <th className="column-control-panel">Product</th>
                  <th className="column-control-panel" >Price</th>
                  <th className="column-control-panel" >Image</th>
                  <th className="column-control-panel">Type</th>
                  <th className="column-control-panel" >Edit</th>
                  <th className="column-control-panel" >Delete</th>
                </tr>
              </thead>

              {listitem.map((products) => (
                <tr>
                  <td className="row-control-panel">{products.id}</td>
                  <td className="row-control-panel">{products.item}</td>
                  <td className="row-control-panel">${products.price}</td>
                  <td className="row-control-panel">
                    <img
                      className="icon-product"
                      src={products.img}
                      alt="-icon"
                    />
                  </td>
                  <td className="row-control-panel">{products.type}</td>
                  <td className="row-control-panel">
                    <img
                      className="icon-edit"
                      src={editIcon}
                      alt="edit-icon"
                      onClick={handleClick}
                    />
                  </td>
                  <td className="row-control-panel" >
                    <img
                      className="icon-delete"
                      src={deleteIcon}
                      alt="delete-icon"
                      onClick={() => deleteProduct(products)}
                    />
                  </td>
                </tr>
              ))}
           </table>
            
           
          </section>
        )
      ) : (  
        <CreateNewUser /> 
      )}
    </div>
  );
}
