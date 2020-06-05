import mongoose from 'mongoose'
import Express from 'express'
import React from 'react'
import jwt from 'jsonwebtoken';
import { createStore } from 'redux'
import { StaticRouter } from 'react-router-dom';
import rootReducers from '../client/reducers/rootreducer'
import { Provider } from 'react-redux'

import config from './config'; 
import App from '../common/app'
import {renderToString} from 'react-dom/server'
import cors from 'cors'
const ExpressApp = Express();
const port = 3000
/******Routes ********/
import NavigationRoute from './routes/navigation.routes';
import ProductCategoryRoute from './routes/category.routes';
import RegisterRoute from './routes/register.routes';
import LoginRoute from './routes/login.route';
import ProfileRoute from './routes/profile.route';
import ProductRoute from './routes/product.routes';
import CartRoute from './routes/cart.routes';
import OrderRoute from './routes/order.route'
/******End ***********/
ExpressApp.use(cors());
ExpressApp.use(Express.static('dist'));
mongoose.connect(config.database,{ useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
const mylogger = (err,req, res, next) =>{
     console.log('-----------------', new Date(), '-----------------');
     console.log('REQ:', err);
     console.log('-----------------#########-----------------');
     next();
}
const authenticate = (req, res, next) =>{

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //decode token
 
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.send(401).json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    return res.send(401).json({ success: false, message: 'Session expired.' });   
  }
}
ExpressApp.use(mylogger);

ExpressApp.use(Express.json()) //JSON Parser Middleware

/** APIs */
ExpressApp.use('/api/navigation', NavigationRoute)
ExpressApp.use('/api/category', ProductCategoryRoute)
ExpressApp.use('/api/register', RegisterRoute)
ExpressApp.use('/api/login', LoginRoute)
ExpressApp.use('/api/profile',authenticate, ProfileRoute)
ExpressApp.use('/api/products', ProductRoute)
ExpressApp.use('/api/cart', CartRoute)
ExpressApp.use('/api/order', authenticate, OrderRoute)


// This is fired every time the server side receives a request
ExpressApp.use('/',handleRender)
// We are going to fill these out in the sections to follow
function handleRender(req, res) { 
        var context = {}
        // Compile an initial state
        const preloadedState = {}//data
        // Create a new Redux store instance
        const store = createStore(rootReducers, preloadedState)
        // Render the component to a string
        const html = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App navigation={preloadedState}/>
            </StaticRouter>
          </Provider>
        )
        if (context.url) {
          res.redirect(context.url);
          return;
      }
        
      res.send(renderFullPage(html, preloadedState))

}
function renderFullPage(html, preloadedState) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Ekart one shopping stop</title>
          <link href="style/styles.css" rel="stylesheet">
        </head>
        <body>
          <div id="app">${html}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="./client.bundle.js"></script>
        </body>
      </html>
      `
  }



ExpressApp.listen(port, ()=> console.log('Server is running at http://localhost:3000/'));
