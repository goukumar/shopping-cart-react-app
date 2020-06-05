
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import React, { Component } from 'react';
import * as appService from '../../services/app.service'


class CartComponent extends Component{
    state = {
        total:0
    }
    handleChange=(e)=>{
        const { name, value } = e.target;
        const pid = e.target[e.target.selectedIndex].getAttribute('data-pid')
        let item ={
            product: pid,
            qty: value,
            userid: appService.getLoginedID()
        }
        this.props.updateCartItems(item);
    }
    removeItem = (pid) =>{
        this.props.removeItem({product:pid, uniqid:appService.getUniqid()})
    }
    render() {
        const selectOptions = [1,2,3,4,5]
        let total=0
        return (
            <div className="cart">
                <h2> Shopping Cart </h2>
                <div className="row list-head">
                    <div className="col-5"> </div>
                    <div className="col-4">Price</div>
                    <div className="col-3">Quantity</div>
                </div>
                {this.props.cart.cart.map((item, index)=>{
                   
                  total = this.props.cart.cartItems[index].price * item.qty + total
                    return(
                        <div className="row list-section">
                            <div className="col-5">
                                <figure><img src={this.props.cart.cartItems[index].image}/></figure>
                            </div>
                            <div className="col-4">&#8360; {this.props.cart.cartItems[index].price} x {item.qty } = {this.props.cart.cartItems[index].price * item.qty}
                            </div>
                            <div className="col-3">
                                <select onChange={(e)=>{this.handleChange(e)}}>
                                    {selectOptions.map(element => {
                                        return <option data-pid={item.productid} selected={element === item.qty ? true: false} value={element}>{element}</option>
                                    })}
                                </select>
                                <a href="javascript:void(0)" onClick={(e)=>this.removeItem(item.productid)} className="float-right"> Remove </a>
                            </div>
                        </div>
                    )
                })}
                <div className="row list-footer">
                    <div className="col-12 text-right">Subtotal : {total}</div>
                </div>
                <NavLink to='/checkout' className="btn btn-primary float-right"> Checkout </NavLink>
            </div>    
        )
    }
        
}

const mapStateToProps = state => ({
 cart : state.productReducer
})
const mapDispatchToProps = disptach => {
  return {
    updateCartItems: (payload) => disptach({
      type: 'UPDATE_CART_ASYNC',
      payload:payload
    }),
    laodCategory: () => disptach({
        type: 'LOAD_CART'
    }),
    removeItem: (payload) => disptach({
        type: 'REMOVE_CART_ASYNC',
        payload:payload
    })
  }
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(CartComponent);
export default Cart;
