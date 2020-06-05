
import React from 'react';

import {NavLink} from 'react-router-dom'

const Footer = props => {
   
        return (
            <div className="container">
            <div className="footer row">
                <div className="col">
                     <h5> Services </h5>
                    <nav className="nav flex-column">
                        <NavLink className="nav-link" to='/about'>Web design</NavLink>
                        <NavLink className="nav-link" to='/compay'>Development</NavLink>
                        <NavLink className="nav-link" to='/team'>Hosting</NavLink>
                    </nav>
                </div>
                <div className="col">
                    <h5> About </h5>
                    <nav className="nav flex-column">
                        <NavLink className="nav-link" to='/about'>About</NavLink>
                        <NavLink className="nav-link" to='/compay'>Company</NavLink>
                        <NavLink className="nav-link" to='/team'>Team</NavLink>
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </nav>
                </div>
                
                <div className="col">
                    <h5> Company Name </h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                </div>
                </div>
            </div>
        )
    
}


export default Footer;