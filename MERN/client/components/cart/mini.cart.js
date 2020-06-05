
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import React, { Component } from 'react';

const MiniCart = props => {
    const cart = props.cart
        return (
            <div className="col mini-cart">
                        <div className="basket">
                        <NavLink className="nav-link" to="/viewcart">
                        {cart.length>0 && <div className="count">{cart.length}</div>}
                        <img src="../../images/Kart.png" title="One stop for all your shopping need" width="30"/> 
                        <span>Cart</span></NavLink>
                        </div>
            </div>    
        )
}

export default MiniCart;
