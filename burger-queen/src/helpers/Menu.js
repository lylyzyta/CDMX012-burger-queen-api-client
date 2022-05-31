import { useState, useEffect } from "react";
import { NewOrder } from "./NewOrder";

export default function Menu(prop) {

  const [listOrder, setListOrder] = useState([])
  const [productstoSend, setproductstoSend] = useState([])
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([])
  


  async function getResponse(url) {
    const response = await fetch(url);
    return await response.json();
  }

  useEffect(() => {
    getResponse("http://localhost:3004/products").then((json) =>
      setProducts(json)
    );
  }, []);
  
  function deleteItem(product) {
    if (listOrder.length === 1) {
      const index = listOrder.indexOf(product)
      setListOrder(listOrder.splice(index + 1))
    } const index = listOrder.indexOf(product)
    setListOrder(listOrder.splice(index + 1))

  }

  function pickingOrder(product) {
    const exists = listOrder.includes(product);
    if (exists) {
      return
    } setListOrder([...listOrder, product])
    const qtyProducts = { qty: 1, product: product.item }
    setproductstoSend([...productstoSend, qtyProducts])
    setTotal([...total, {sub: product.price, id: product.id}])
    
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


        <NewOrder className="orderForm" product={listOrder} deleteItem={deleteItem} productstoSend={productstoSend} setproductstoSend={setproductstoSend} setTotal={setTotal} total={total} />



        <button type="button" id="cancelOrder" className="btn-cancel-order" onClick={() => {
          setListOrder([])
          setproductstoSend([])
          setTotal([])
        }
        }>
          {" "}
          Cancel Order
        </button>

      </div>



    </section>
  );
}