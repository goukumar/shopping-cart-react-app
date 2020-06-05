
import {connect} from 'react-redux';
import {Redirect, NavLink} from 'react-router-dom'
import React, { Component } from 'react';
import * as appService from '../../services/app.service'
import Register from '../profile/profile';

class LoginComponent extends Component{
    state = {
        user: {
            email: '',
            password: '',
        },
        submitted: false
    }
    handleSubmit = (e) => {
      e.preventDefault();
      const { user } = this.state 
      
      this.setState({ submitted: true });
      
        if (user.email && user.password) {
            this.props.login({email:user.email, password: user.password});
        }
      
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          user: { 
          ...this.state.user,
          [name]: value 
          },
          submitted: false
        });
    }
    render() {
        const {submitted, user:{password, email}} = this.state
        if(appService.isAuth()) {
          return <Redirect to={'/home'} />
        }
        return (
            <div className="user-form">
            {this.props.user.code === 400 &&
            <div className="help-block">{this.props.user.message}</div>}
            <h2>Login</h2>
            <form onSubmit={(e)=>{this.handleSubmit(e)}} name="login-form" method="post"> 
            <div className='form-group'>
                <label htmlFor='email'>Email address</label>
                <input type='email' className='form-control' name='email' value={email} onChange={(e)=>{this.handleChange(e)}}/>
                {submitted && !email &&
                    <div className="help-block">Please Enter Email</div>
                }
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' className='form-control' name='password' value={password} onChange={(e)=>{this.handleChange(e)}}/>
                {submitted && !password &&
                    <div className="help-block">Please Enter Password</div>
                }
            </div>
            <button type='submit' className='btn btn-primary'>
                Login
            </button>
            <NavLink to='/register' className="float-right"> Register </NavLink>
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
    login: (payload) => disptach({
      type: 'USER_LOGIN_ASYNC',
      payload: payload
    })
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;

