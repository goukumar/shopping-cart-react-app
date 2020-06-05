import React, { Component } from 'react';
import Category from '../../client/components/category/category';

class HomePage extends Component{
   
    render() {
        return (
            <div className="home-page">
              <Category />
            </div>
        )
    }
}
export default HomePage;