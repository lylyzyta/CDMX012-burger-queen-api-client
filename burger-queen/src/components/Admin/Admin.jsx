import "./Admin.css";
import { logout } from "../../lib/firebaseAuth";
import LogoImage from "../../img/Logo_Image.png";
import { auth } from "../../lib/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Read from "./Crud/Read";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleClick = async () => {
    await logout(auth);
    navigate("/");
  };

  const [filterPanel, setFilterPanel] = useState();

  return (
    <div className="container-admin">
      <section className="container-option-control-panel">
        <img className="logo-icon-admin" src={LogoImage} alt="logo-icon" />

        <button
          className="btn-option-panel"
          value="user"
          onClick={(e) => setFilterPanel(e.target.value)}
        >
          {" "}
          Users
        </button>
        <button
          type="button"
          className="btn-option-panel"
          value="products"
          onClick={(e) => setFilterPanel(e.target.value)}
        >
          {" "}
          Products
        </button>
        <button className="btn-option-panel" onClick={handleClick}>
          LogOut
        </button>
      </section>

      <section className="container-show-control-panel">
        <Read option={filterPanel} />
      </section>
    </div>
  );
}
