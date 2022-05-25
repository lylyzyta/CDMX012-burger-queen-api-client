import "./Kitchen.css";
import { logout } from "../../lib/firebaseAuth";
import { auth } from "../../lib/firebaseConfig";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import CrudDashboard from "../Kitchen/ListStatus/OrderDashboard/CrudDashboard";
import Loader from "../Kitchen/ListStatus/Loader";
import Message from "../Kitchen/ListStatus/Message";


export default  function KitchenPage () {

    const navigate = useNavigate();

    const handleClick = async () => {
        await logout(auth);
        navigate('/');
    };



    const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  let api = helpHttp();
  let url = "http://localhost:3004/orders";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        //console.log(res);
        if (!res.err) {
          setDb(res);
          setError(null);
        } else {
          setDb(null);
          setError(res);
        }
        setLoading(false);
      });
  }, [url]);


  const setChangeStatus = (data) => {
    let endpoint = `${url}/${data.id}`;
    //console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options)
    .then((res) => {
      console.log(res);
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        let filterData = db.map((el) => (el.status === 'pending' ? data.status.replace("pending", "ready to serve") : false));
        /* if (data.status === 'pending'){
            let change = data.status.replace("pending", "ready to serve")
            console.log(change)
        } */
        console.log(filterData)
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };






    return(
        <div className="container-kitchen">
            <div className="headerKitchen">
                <h3 className="container-head-h3" onClick={handleClick}>Salir</h3>
            </div>
            <article className="box-generalKitchen">
                {loading && <Loader />}
                {error && (
                <Message
                    msg={`Error ${error.status}: ${error.statusText}`}
                    bgColor="#dc3545"
                />
                )}
                {db && (
                <CrudDashboard
                    data={db}
                    setChangeStatus={setChangeStatus}
                    
               />)}

            </article>
        </div>
    );
}