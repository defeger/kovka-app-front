import React from 'react'
import Home from '../pages/Home';
import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Works from '../components/Works';
import Contacts from '../components/Contacts';
import Description from '../pages/Description';



const router = createBrowserRouter([
    {
      path: "/",
      element: <App />, 
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/reg",
            element: <Registration />
        },
        {
            path: "/desc/:id",
            element: <Description />
        },
        {
            path: "/cont",
            element: <Contacts />
        },
      ]
    }
  ]);


export default router