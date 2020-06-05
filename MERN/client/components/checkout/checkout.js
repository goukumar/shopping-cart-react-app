
import {connect} from 'react-redux';
import * as userAPI from  '../../actions/user.actions'
import React, { Component } from 'react';
import * as appService from '../../services/app.service'
import {Redirect} from 'react-router-dom'
import { OrderedMap } from '../../../node_modules/immutable';

class AddressComponent extends Component{
    state = {
        address: {
            street: '',
            sector:'',
            city: '',
            state:'',
            pin: ''
        },
        submitted: false,
        isOrdered: false
    }
    handleSubmit = (e) => {
      e.preventDefault();
      const { address } = this.state 
      
      this.setState({ submitted: true });
      
          if (address.street && address.sector && address.city && address.state && address.pin) {

            this.props.orderedMap({address: address, userid: appService.getLoginedID(), uniqid:appService.getUniqid()});
        }
      
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          address: { 
          ...this.state.address,
          [name]: value 
          },
          submitted: false
        });
    }
    orderedMap = () =>{
        try{
            userAPI.fetchProfile('http://localhost:3000/api/order',appService.getLoginedID(), appService.getAccessToken(), (response)=>{
                this.setState({
                    address: { 
                    ...response.payload
                    }
                });
            })
        } catch(err){}
    }
    componentWillMount = () =>{
        if(!appService.isAuth()){
            return <Redirect to='/login' />
        }
       
    }
    
    render() {
       const {submitted, address:{street, sector, city, state, pin}} = this.state
            return (
                <div className="address-form">
                 {this.props.user.code === 200 && submitted &&
                    <Redirect to='/orders'/>}
                    <h2>Shipping Address</h2>
                    <form onSubmit={(e)=>{this.handleSubmit(e)}} name="registration-form">
                    <div className='form-group'>
                        <label htmlFor='street'>Street</label>
                        <input type='text' className='form-control' name='street' value={street} onChange={(e)=>{this.handleChange(e)}}/>
                        {submitted && !street &&
                            <div className="help-block">Please Enter Street</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor='sector'>Locality</label>
                        <input type='text' className='form-control' name='sector' value={sector} onChange={(e)=>{this.handleChange(e)}}/>
                        {submitted && !sector &&
                            <div className="help-block">Please Enter Locality Address</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor='state'>State</label>
                        <input type='text' className='form-control' name='state' value={state} onChange={(e)=>{this.handleChange(e)}}/>
                        {submitted && !state &&
                            <div className="help-block">Please Enter State</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor='city'>City</label>
                        <input type='text' className='form-control' name='city' value={city} onChange={(e)=>{this.handleChange(e)}} />
                        {submitted && !city &&
                            <div className="help-block">Please Enter City</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pin'>Pin</label>
                        <input type='text' className='form-control' name='pin' value={pin} onChange={(e)=>{this.handleChange(e)}} />
                        {submitted && !pin &&
                            <div className="help-block">Please Enter Pin Code</div>
                        }
                    </div>
                    <button type='submit' className='btn btn-primary'>
                         Procced To Checkout
                    </button>
                    {/* <a href="javascript:void(0)" className='btn btn-primary float-right' onClick={(e)=>this.orderedMap(e)}> Procced To Checkout</a> */}

                    </form>
                       </div>
            )
        
    }
        
}

const mapStateToProps = state => ({
 user : state.userReducer
})
const mapDispatchToProps = disptach => {
  return {
    addAddress: (payload) => disptach({
      type: 'ADD_ADDRESS_ASYNC',
      payload: payload
    }),
    orderedMap: (payload) => disptach({
        type: 'ORDER_ASYNC',
        payload: payload
      })
  }
}

const Address = connect(mapStateToProps, mapDispatchToProps)(AddressComponent);
export default Address;

