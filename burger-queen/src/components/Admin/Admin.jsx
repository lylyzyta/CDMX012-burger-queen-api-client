import "./Admin.css";
import { logout } from "../../lib/firebaseAuth";
import { auth } from "../../lib/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default  function AdminPage () {

    const navigate = useNavigate();

    const handleClick = async () => {
        await logout(auth);
        navigate('/');
    };

    return(
        <div className="container-admin">
        <h3 className="container-head-h3" onClick={handleClick} >
          Salir
        </h3>
            <section className="container-options-cook">
            <h3>Listado de meseros</h3>
            <h3>Agregar mesero</h3>
            <h3>Menú</h3>
            <h3>Modificar menú</h3>

            </section>
                
        </div>
    )
}