import React, { Component } from 'react'
import './product-condensed.css'
import DataService from '../services/data-service'
// eslint-disable-next-line

let ds = new DataService()

class ProductCondensed extends Component {

    constructor(props)
    {
        super(props)

        this.removeProduct = this.removeProduct.bind(this)
    }

    removeProduct = () =>
    {
        ds.removeWishListItem(this.props.product)
    }




    render() {
        return (
            <li className="list-group-item pc-condensed">
                <a href="#"className="btn btn-outline-danger" onClick={()=>this.removeProduct()}>X</a>
                <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
            </li>
        )
    }
}

export default ProductCondensed