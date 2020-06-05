
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom'
import React, { Component } from 'react';
import User from '../user/user';
import * as appService from '../../services/app.service'

import MiniCart from '../cart/mini.cart';


class HeaderComponent extends Component{
    constructor(props) {
        super(props);

    }
    toggleDropdown = (ref)=>{
        this.dropdownmenu.classList.toggle('show')
    }
    handleLogout = () =>{
        this.props.logOut();
        return <Redirect to='/'/>
    }
    constructNavigation = (objArray) =>{
        return objArray.map((item)=> {
            return (<li className="nav-item" key={item._id}>
            {
                item.subcategory.length
                ? <NavLink activeClassName="selected" className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(ref) => {this.toggleDropdown(ref)}}>{item.lebel}</NavLink>
                : <NavLink activeClassName="selected" className="nav-link" to={item.link}>{item.lebel}</NavLink>
            }
                {
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown" ref={(ref) => this.dropdownmenu = ref}>
                    {
                        item.subcategory.map((sub)=>{
                        
                            return (<NavLink activeClassName="selected" className="dropdown-item" to={'/category'+sub.link} key={sub._id} onClick={(ref) => {this.toggleDropdown(ref)}}>{sub.lebel}</NavLink>)
                    
                        })
                    
                    }
                    </div>
                    
                } 
            </li>)
        })
    }
    componentDidMount = () =>{
        this.props.laodNavigation();

        this.props.getCartItems({uniqid:appService.getUniqid(), userid: appService.getLoginedID()});
    }

    render() {
        return (
            <header>
                <div className="row">
                    <div className="col"><NavLink className="logo" to='/'> <img src="../../images/logo.jpg" title="One stop for all your shopping need" /> </NavLink></div>
                    <div className="col-6 header-middle-section">
                    <div className="row search-form"><input type="text" placeholder="Search for Products..."/> <button>Search</button></div>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <ul className="navbar-nav mr-auto">
                        {
                           this.constructNavigation(this.props.navigation)
                            
                        }
                        </ul>
                    </nav>
                    </div>
                    <div className="col-4 header-right-section">
                        <div className="row">
                            <User handlelogout={this.handleLogout} {...this.props}/>
                            <MiniCart {...this.props}/>
                        </div>
                    </div>
                </div>
                </header>            
        )
    }
        
}

const mapStateToProps = state => ({
 navigation : state.headerReducer.navigation,
 user: state.userReducer,
 cart: state.productReducer.cart
})
const mapDispatchToProps = disptach => {
  return {
    laodNavigation: () => disptach({
      type: 'LOAD_NAVIGATION_ASYNC'
    }),
    getCartItems: (payload) => disptach({
        type: 'LOAD_CART_ASYNC',
        payload:payload
    }),
    logOut: () => disptach({
        type: 'USER_LOGOUT'
    })
  }
}

 const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
export default Header;