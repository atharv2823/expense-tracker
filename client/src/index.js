import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider , createBrowserRouter} from "react-router-dom"

import Home from "./views/Home/Home.js"
import Login from './views/Login/Login.js';
import Signup from './views/Signup/Signup.js';
import "./global.css";
import AddTransaction from './views/AddTransaction/AddTransaction.js';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
{
  path: '/',
  element: <Home/>,
},
{
  path: '/login',
  element: <Login/>,
},
{
  path: '/signup',
  element: <Signup/>,
},
{
  path: '/add-transaction',
  element: <AddTransaction/>,
},
{
  path:'*',
  element: <h1>Not Found</h1>
}
])

root.render(<RouterProvider router= {router} />);

