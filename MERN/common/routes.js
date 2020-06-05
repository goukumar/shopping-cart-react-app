import HomePage from './pages/home.page'
import Register from '../client/components/registration/register';
import Products from '../client/components/products/products';
import Login from '../client/components/login/login';
import Cart from '../client/components/cart/cart';
import Orders from '../client/components/orders/orders';
import Checkout from '../client/components/checkout/checkout';

import UserProfilePage from './pages/user.profile.page'

const siteRoutes = [
  
      { 
		  path: '/',
        exact: true,
        component: HomePage
      },
      { 
        path: '/home',
        exact: true,
        component: HomePage
	  },
      { 
        path: '/login',
        exact: true,
        component: Login
      },
      { 
        path: '/register',
        exact: true,
        component: Register
      },
      { 
        path: '/profile',
        exact: true,
        component: UserProfilePage
      },
      { 
        path: '/viewcart',
        exact: true,
        component: Cart
      },
      { 
        path: '/category/:category',
        exact: true,
        component: Products
      },
      { 
        path: '/orders',
        exact: true,
        component: Orders
      },
      { 
        path: '/checkout',
        exact: true,
        component: Checkout
      }
  
];

export default siteRoutes;