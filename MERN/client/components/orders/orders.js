import React, { Component } from 'react';
import * as appService from '../../services/app.service'

import {fetchProfile} from '../../actions/user.actions'

class Orders extends Component{
    state = {
        orders:[]
    }
    componentWillMount = () =>{
        if(!appService.isAuth()){
            this.props.history.push('/login')
        }
       
    }
    componentDidMount = () =>{
            fetchProfile('http://localhost:3000/api/order', appService.getLoginedID(), appService.getAccessToken(), (response)=>{
                this.setState({
                    orders: 
                    response
                    
                });
            })
       
    }
    render() {
        return (
            <div className="orders">
                <h2> Orders List </h2>
                <div className="row list-head">
                    <div className="col-5"> Order ID</div>
                    <div className="col-4">Price</div>
                    <div className="col-3">Quantity</div>
                </div>
                {this.state.orders.map((item, index)=>{
               
                    return(
                        <div className="row list-section">
                            <div className="col-5">
                                <a href="javascript:void(0)"> {item._id} </a>
                            </div>
                            <div className="col-4">{item.address.street}, {item.address.sector}, {item.address.city}, {item.address.state} - {item.address.pin}</div>
                            <div className="col-3">
                            {item.orederDate}
                            </div>
                        </div>
                    )
                })}
               
            </div>    
        )
    }
        
}

export default Orders;
