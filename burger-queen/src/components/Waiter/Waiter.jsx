import { useAuth } from '../../context/AutProvider';

import { useState, useEffect } from 'react';



export default function WaiterPage() {

   
        const [products, setProducts] = useState([]);
        useEffect(() => {

            const data = fetch("http://localhost:3004/products").then(res => res.json()).then(result => {
                let arrayProd = []
                const other = result.map((typeOfPlate) => {                
                    

                    arrayProd.push(typeOfPlate);



                });

                setProducts(arrayProd)

            });


        }, [])
      console.log(products);

      
        
    


    const { logout } = useAuth();
    const handleClick = async () => {
        await logout();
    }





    return (
        <><h1>Waiter</h1>
        <div>
            {products.map(each=>{
console.log(each);
<p>{each.item}</p>
<img src="each.img" alt=""/>

            })
        }
        </div>





            <button typeof='submit' onClick={handleClick}> Cerrar Sesión</button>
        </>
    )
}