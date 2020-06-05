import React, {Component} from 'react';
import {Route, Switch, withRouter } from 'react-router-dom'
import Header from '../client/components/header/header';
import Banner from '../client/components/banner/banner';
import Footer from '../client/components/footer/footer';
//import * as Routes from './routes';
import siteRoutes from './routes';

class App extends Component {
    
    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        return(
            <div className="container">
             <Header />
             <Banner />
            <Switch>
              {siteRoutes.map(({path, exact, component:C, ...rest})=>(
                <Route 
                    key={path} 
                    exact={exact}
                    path={path}
                    from={from}
                    component={C} 
                    {...this.props}
                    
                />
              ))}
              </Switch>
              <Footer />

            </div>  
        )
    }
}

export default withRouter(App);