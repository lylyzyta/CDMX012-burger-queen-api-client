import { useState, useEffect } from "react";
import { NewOrder } from "./NewOrder";

export default function Menu(prop) {
 

  const [products, setProducts] = useState([]);
  const [listOrder, setListOrder] = useState([])
 

  async function getResponse(url) {
    const response = await fetch(url);
    return await response.json();
  }

  useEffect(() => {
    getResponse("http://localhost:3004/products").then((json) =>
      setProducts(json)
    );
  }, []);

  function pickingOrder(product) {
    console.log(product.item)
    const exists = listOrder.includes(product);
    if(exists){
      return
    } setListOrder([...listOrder, product])
console.log(listOrder, "antes splice");
  }

  function deleteItem(product){
    console.log("me llamó");
   const index =listOrder.indexOf(product)
   console.log(index);
   setListOrder(listOrder.splice(index))
   console.log(listOrder, "despues splice");
  }

  return (
    <section >
    <div className="container-menu">
         {products.filter(product => product.type === `${prop.option}`).map((products) => (
          <section className="container-product" onClick={() => pickingOrder(products)} >
            <img className="menu-img" src={products.img} alt="logo-icon" />
            <p className="menu-description">
              {products.item} <br /> $ {products.price}
            </p>
           </section>
        ))}
        
        </div>
        <div className="container-new-order">
    
     <button type="button" className="btn-new-order"  >
            {" "}
           New Order
          </button>
          <NewOrder className="orderForm" product={listOrder} deleteItem={deleteItem} />
     
         
          <button type="button" id="cancelOrder" className="btn-cancel-order" onClick={() => {
              setListOrder([])
            }
            }>
              {" "}
              Cancel Order
            </button>
     </div>
     
    
    
     </section>
  );
}
