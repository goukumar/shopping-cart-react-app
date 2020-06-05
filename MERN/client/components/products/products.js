
import {connect} from 'react-redux';
import React, { Component } from 'react';

import * as appService from '../../services/app.service'

class ProductsComponent extends Component{
    componentDidMount = () =>{
        this.props.laodProducts({category:this.props.match.params.category});
    }
    shouldComponentUpdate(nextProps) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }
    componentDidUpdate = () =>{
        this.props.laodProducts({category: this.props.match.params.category});
    }
    addToCart=(pid)=>{
        let item ={
            product: pid,
            qty: 1,
            userid: appService.getLoginedID()
        }
        this.props.addToCart(item);
    }
    buyNow=(pid)=>{
        if(!appService.isAuth()){
           return this.props.history.push('/login')
        } else {
            let item ={
                product: pid,
                qty: 1,
                userid: appService.getLoginedID()
            }
            this.props.addToCart(item);
            return this.props.history.push('/checkout')
        }
    }
    render() {
        return (
            <section className="products row">
            {
                this.props.products.map((item)=> {
                    return (<div className="col-sm-4 product" key={item._id}>
                         <p className="product-name">{item.name}</p>
                        <figure><img src={item.image} alt={item.category}/></figure>
                         <p className="price">Price: &#8360; {item.price}</p>
                         <div className="text-center">
                          <a href="javascript:void(0)" className="buy-now btn btn-primary float-left" onClick={()=>{this.buyNow(item._id)}}> Buy Now </a>
                          <a href="javascript:void(0)" className="btn btn-primary add-to-cart float-right" onClick={()=>{this.addToCart(item._id)}}>Add To Cart</a>
                          </div>
                    </div>)
                })
            }
                
            </section>   
        )
    }
        
}
const mapStateToProps = state => ({
    products : state.productReducer.products
   })
   const mapDispatchToProps = disptach => {
     return {
       laodProducts: (payload) => disptach({
         type: 'LOAD_PRODUCTS_ASYNC',
         payload:payload
       }),
       addToCart: (payload) => disptach({
        type: 'ADD_TO_CART_ASYNC',
        payload:payload
      })
     }
   }
   
const Products = connect(mapStateToProps, mapDispatchToProps)(ProductsComponent);
export default Products;

