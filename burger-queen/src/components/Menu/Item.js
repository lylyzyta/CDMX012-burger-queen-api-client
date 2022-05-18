import React,{Fragment} from 'react';

function Item({product}) {
    console.log(product)
    return (
        <div>{product&&
            <Fragment>
        <h2>{product.item}</h2>
        <strong>{product.price}</strong>
        </Fragment>
            }
            
        </div>
    );
}

export default Item;