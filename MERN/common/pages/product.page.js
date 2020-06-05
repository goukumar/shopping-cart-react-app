import React, { Component } from 'react';
import Products from '../../client/components/products/products';

class ProductPage extends Component{
    constructor(props) {
        super(props);
    }
    render() {
            return (
                <div className="product-page">
                    <Products {...this.props}/>
                </div>
            )
        }
    }

export default ProductPage;
