import "./../Admin.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../lib/firebaseConfig";
import { logout } from "../../../lib/firebaseAuth";
import editIcon from "../../../img/OrderStatus/editOrder.svg";
import deleteIcon from "../../../img/OrderStatus/deleteOrder.svg";
import { useState, useEffect } from "react";
import CreateNewUser from "./CreateNewUser";
import CreateNewProduct from "./CreateNewProduct";


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

  return (
    <div>
      {" "}
      {renderOptions ? (
        url === "https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/user" ? (
          <section className="container-show-control-panel">
            <h3 className="titles-control-panel">Users List</h3>
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
                <tr>
                  <td className="row-control-panel">{users.name}</td>
                  <td className="row-control-panel">{users.email}</td>
                  <td className="row-control-panel">{users.password}</td>
                  <td className="row-control-panel">{users.rol}</td>
                  <td className="row-control-panel">
                    <img
                      className="icon-edit"
                      src={editIcon}
                      alt="edit-icon"
                      onClick={handleClick}
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
              ))}
              </table>
              <button
                type="button"
                className="btn-add-item"
                value="adduser"
                onClick={() => setRenderOptions(false)}
              >
                Add New User
              </button>
           
          </section>
        ) : (
          <section className="container-show-control-panel">
            <h3 className="titles-control-panel">Product List</h3>
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
              <button
                type="button"
                className="btn-add-item"
                value="addproduct"
                onClick={() => setRenderOptions(false)}
              >
                Add New Product
              </button>
           
          </section>
        )
      ) : (  
        <CreateNewUser /> 
      )}
    </div>
  );
}
