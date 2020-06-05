import React, { Component } from 'react';
import Register from '../../client/components/registration/register';

class RegisterPage extends Component{
   
    render() {
        return (
            <div className="registration-page">
              <Register />
            </div>
        )
    }
}
export default RegisterPage;