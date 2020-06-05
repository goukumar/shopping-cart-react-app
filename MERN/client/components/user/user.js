
import {NavLink, Redirect} from 'react-router-dom'
import React, { Component } from 'react';
import * as appService from '../../services/app.service'

class Profile extends Component{
    handleDropdown = () =>{
        this.dropdownmenu.classList.toggle('show')
    }
    render() {
        if(this.props.user.isAuthed || appService.isAuth()) {
            return(
            <div className="col user">
             <div className="btn-group">
                    <NavLink to="/profile" className="nav-link">{appService.getUserName()}</NavLink>
                        <span className="dropdown-toggle" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent" onClick={this.handleDropdown}>
                        <span className="sr-only">Toggle Dropdown</span>
                    </span>
                    <div className="dropdown-menu" ref={(ref) => this.dropdownmenu = ref} aria-labelledby="dropdownMenuReference">
                        <a href="javascript:void(0)" className="dropdown-item" onClick={(e)=>{this.props.handlelogout(e)}}>Logout</a>
                        <div className="dropdown-divider"></div>
                            <NavLink to="/orders" className="dropdown-item" onClick={this.handleDropdown}>Orders</NavLink>
                        </div>
                </div></div>
            )      
        } else {
        return (
            <div className="col user">
            <div className="btn-group">
                 <NavLink className="nav-link" to="/login">Login</NavLink>
             </div></div>
         )
        }
    }
        
}

export default Profile;

