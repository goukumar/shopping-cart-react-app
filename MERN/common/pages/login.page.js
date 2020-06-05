import React, { Component } from 'react';
import Login from '../../client/components/login/login';

class LoginPage extends Component{
   
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        return (
            <div className="login-page">
              <Login from={from} {...this.props}/>
            </div>
        )
    }
}
export default LoginPage;