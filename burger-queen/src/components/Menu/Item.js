import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

function Item ({ product }) {
  Item.propTypes = {
    product: PropTypes.object
  }
  console.log(product)
  return (
        <div>{product &&
            <Fragment>
        <h2>{product.item}</h2>
        <strong>{product.price}</strong>
        </Fragment>
            }
        </div>
  )
}

export default Item
