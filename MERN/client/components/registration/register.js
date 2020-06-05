
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import React, { Component } from 'react'
import * as appService from '../../services/app.service'


class RegisterComponent extends Component{
    state = {
        user: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        },
        submitted: false
    }
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
      e.preventDefault();
      const { name } = e.target;
      const { user } = this.state 
      
      this.setState({ submitted: true });
      
          if (user.firstname && user.lastname && user.email && user.password) {
            this.props.register({firstname:user.firstname, lastname:user.lastname, email:user.email, password: user.password});
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
        const {submitted, user:{firstname, lastname, password, email}} = this.state
        if(this.props.user.code === 200) {
            return (<div className="user-form">
             <div className="success-block">{this.props.user.message}</div>
            </div>)
        } else {
            return (
                <div className="user-form">
                {this.props.user.code === 400 && 
                    <div className="help-block">{this.props.user.message}</div>}
                    <h2>Register</h2>
                    <form onSubmit={(e)=>{this.handleSubmit(e)}} name="registration-form">
                    <div className='form-group'>
                        <label htmlFor='firstname'>First Name</label>
                        <input type='text' className='form-control' name='firstname' value={firstname} onChange={(e)=>{this.handleChange(e)}}/>
                        {submitted && !firstname &&
                            <div className="help-block">Please Enter First Name</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor='lastname'>Last Name</label>
                        <input type='text' className='form-control' name='lastname' value={lastname} onChange={(e)=>{this.handleChange(e)}}/>
                        {submitted && !lastname &&
                            <div className="help-block">Please Enter Last Name</div>
                        }
                    </div>
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
                        Register me!
                    </button>
                    </form>
            </div>          
            )
        }
    }
        
}

const mapStateToProps = state => ({
 user : state.userReducer
})
const mapDispatchToProps = disptach => {
  return {
    register: (payload) => disptach({
      type: 'USER_REGISTER_ASYNC',
      payload: payload
    })
  }
}

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
export default Register;

