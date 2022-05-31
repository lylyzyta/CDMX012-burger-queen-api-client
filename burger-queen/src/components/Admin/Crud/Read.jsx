import "./../Admin.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../lib/firebaseConfig";
import { logout } from "../../../lib/firebaseAuth";
import editIcon from "../../../img/OrderStatus/editOrder.svg";
import deleteIcon from "../../../img/OrderStatus/deleteOrder.svg";
import { useState, useEffect } from "react";
import CreateNewUser from "./CreateNewUser";
import CreateNewProduct from "./CreateNewProduct";
import Delete from "./Delete";

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
  }

  function deleteProduct(products) {
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
  }

  return (
    <div>
      {" "}
      {renderOptions ? (
        url === "https://6290ec0e27f4ba1c65c4cd21.mockapi.io/api/user" ? (
          <section className="container-show-control-panel">
            <h3 className="titles-control-panel">Users List</h3>
            <table >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Rol</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              {listitem.map((users) => (
                <tr>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  <td type="password">{users.password}</td>
                  <td>{users.rol}</td>
                  <td>
                    <img
                      className="icon-edit"
                      src={editIcon}
                      alt="edit-icon"
                      onClick={<Delete userid={users} />}
                    />
                  </td>
                  <td>
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

              <button
                type="button"
                className="btn-add-item"
                value="adduser"
                onClick={() => setRenderOptions(false)}
              >
                Add New User
              </button>
            </table>
          </section>
        ) : (
          <section className="container-show-control-panel">
            <h3 className="titles-control-panel">Product List</h3>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              {listitem.map((products) => (
                <tr>
                  <td>{products.id}</td>
                  <td>{products.item}</td>
                  <td>${products.price}</td>
                  <td>
                    <img
                      className="icon-product"
                      src={products.img}
                      alt="-icon"
                    />
                  </td>
                  <td>{products.type}</td>
                  <td>
                    <img
                      className="icon-edit"
                      src={editIcon}
                      alt="edit-icon"
                      onClick={handleClick}
                    />
                  </td>
                  <td>
                    <img
                      className="icon-delete"
                      src={deleteIcon}
                      alt="delete-icon"
                      onClick={() => deleteProduct(products)}
                    />
                  </td>
                </tr>
              ))}

              <button
                type="button"
                className="btn-add-item"
                value="addproduct"
                onClick={() => setRenderOptions(false)}
              >
                Add New Product
              </button>
            </table>
          </section>
        )
      ) : (  
        <CreateNewUser /> 
      )}
    </div>
  );
}
