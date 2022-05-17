import { useAuth } from "../../context/AutProvider";
import "./Waiter.css";
import LogoImage from '../../img/Logo_Image.png';


export default function WaiterPage() {
  const { logout } = useAuth();

  // const navigate = useNavigate();

  const handleClick = async () => {
    await logout();
  };

  return (
    <div className="container-waiter">
      <nav className="container-head">
        <h3 className="container-head-h3" onClick={handleClick}>
          Salir
        </h3>
        <img className="logo-icon-waiter" src={LogoImage} alt="logo-icon" />
      </nav>
      <section className="container-products">
        <div className="option-menu">
          <button type="button" className="btn-menu">
            {" "}
            Desayuno
          </button>
          <button type="button" className="btn-menu">
            {" "}
            Comida
          </button>
          <button type="button" className="btn-menu">
            {" "}
            Bebidas
          </button>
        </div>
        <div className="container-menu">
      
        </div>
      </section>
      <section className="container-order">
        <div className="container-status-order">
          <h3>Status Ordenes</h3>
          <h3>Orden 1</h3>
          <h3>Orden 2</h3>
        </div>

        <div className="container-new-order">
          <h3>Nuevo Pedido</h3>
          <h3>Mesa</h3>
          <h3>Orden</h3>
          <h3>Total</h3>
        </div>
      </section>
    </div>
  );
}
