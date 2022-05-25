import { useEffect, useState } from "react"
import "./NewOrder.css";

const NewOrder = ({ product, deleteItem }) => {

const [productstoSend, setproductstoSend] = useState([])
  const [quantityF, setquantityF] = useState(0)
  var convertedStartDate = new Date();
  var month = convertedStartDate.getMonth() + 1
  var day = convertedStartDate.getDay();
  var year = convertedStartDate.getFullYear();
  var shortStartDate = month + "/" + day + "/" + year;

  const initialForm = {
    id: 3 + 23,
    userId: "waiter#",
    client: 3,
    products: productstoSend,
    status: "pending",
    dateEntry: shortStartDate,
    dateProcessed: shortStartDate,
  };

  console.log(initialForm, "cómo se va");


  const [total, setTotal] = useState([])
  function sumar(each) {
   /*  setTotal(e.target.value)
    console.log(e.target.value);
  } */

  setquantityF( document.getElementById(each.id).value);
  const subtotal = quantityF * each.price;
  const result = productstoSend.some(obj => obj.product === each.item);
  console.log(result);

  if (result === false) {
    const producttS = { qty: quantityF, product: each.item }
    setproductstoSend([...productstoSend, producttS])
  }
  console.log(productstoSend, "quedó");


}

  console.log({product})
  return (
    <div className="orderForm" >
    {/*   <form action="">
        {product.map((each) => (
          <div className="row" key={each.item}>
            <input type="number" className="orderInputs" onChange={sumar} />
            <p >{each.item}{each.price}{total * each.price}</p>
            <button onClick={() => deleteItem(each)} >Borrar artículo</button>
          </div>
        ))}


      </form> */}

<form action="">
       {product.map((each) => (
        <div className="row" key={each.item}>
          <input id={each.id} className="qty" min={1} max={12} type="number" onChange={() => sumar(each)} defaultValue={0} />
          <p >{each.item}</p><p> {each.price}</p><button className="deleteButton" onClick={() => deleteItem(each)} >Borrar artículo</button>
          
        </div>
      ))}
</form>


     
    </div>
  )

}





export {
  NewOrder,

}