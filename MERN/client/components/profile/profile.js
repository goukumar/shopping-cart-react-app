
import {connect} from 'react-redux';
import * as userAPI from  '../../actions/user.actions'
import React, { Component } from 'react';
import * as appService from '../../services/app.service'



class RegisterComponent extends Component{
    state = {
        user: {
            firstname: '',
            lastname: '',
            email: '',
        },
        submitted: false
    }
    constructor(props) {
        super(props);
        
    }
    handleSubmit = (e) => {
      e.preventDefault();
      const { user } = this.state 
      
      this.setState({ submitted: true });
      
          if (user.firstname && user.lastname) {
            this.props.update({firstname:user.firstname, lastname:user.lastname, email:user.email});
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
    componentDidMount = () =>{
       try{
            userAPI.fetchProfile('http://localhost:3000/api/profile',appService.getLoginedID(), appService.getAccessToken(), (response)=>{
                this.setState({
                    user: { 
                    ...response.payload
                    }
                });
            })
        } catch(err){}
       
    }
    
    render() {
      
        const {submitted, user:{firstname, lastname, email}} = this.state
            return (
                <div className="user-form">
                 {this.props.user.code === 200 && submitted &&
                    <div className="success-block">{this.props.user.message}</div>}
                    <h2>User Profile</h2>
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
                        <input type='email' className='form-control' name='email' value={email} onChange={(e)=>{this.handleChange(e)}} readOnly/>
                    </div>
                    <button type='submit' className='btn btn-primary'>
                        Save me!
                    </button>
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
    update: (payload) => disptach({
      type: 'UPDATE_PROFILE_ASYNC',
      payload: payload
    })
  }
}

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
export default Register;

