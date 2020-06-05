import React, { Component } from 'react';
import Profile from '../../client/components/profile/profile';

class UserProfilePage extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        // if(!JSON.parse(localStorage.getItem('userdata'))) {
        //     return <Redirect to={{
        //         pathname: '/login',
        //         state: { from: this.props.location }
        //       }}/>
        // } else {
             return (
                <div className="profile-page">
                <Profile />
                </div>
            )
        //}
    }
}
export default UserProfilePage;

