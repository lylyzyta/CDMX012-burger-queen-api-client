import "./Kitchen.css";
import { logout } from "../../lib/firebaseAuth";
import { auth } from "../../lib/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default  function KitchenPage () {

    const navigate = useNavigate();

    const handleClick = async () => {
        await logout(auth);
        navigate('/');
    };

    return(
        <div className="container-kitchen">
                  <h3 className="container-head-h3" onClick={handleClick}>
          Salir
        </h3>
                
        </div>
    )
}