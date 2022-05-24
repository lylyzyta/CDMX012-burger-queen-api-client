import { useState, useEffect } from "react";


export default function Menu(prop) {
 

  const [products, setProducts] = useState([]);
 
 

  async function getResponse(url) {
    const response = await fetch(url);
    return await response.json();
  }

  useEffect(() => {
    getResponse("http://localhost:3004/products").then((json) =>
      setProducts(json)
    );
  }, []);

  return (
    <div className="container-menu">
         {products.filter(product => product.type === `${prop.option}`).map((products) => (
        <>
          <section className="container-product" >
            <img className="menu-img" src={products.img} alt="logo-icon" />
            <p className="menu-description">
              {products.item} <br /> $ {products.price}
            </p>
         
          </section>
        </>
      ))}
    </div>
  );
}