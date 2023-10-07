import React from "react";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Welcome from './pages/welcome pages/welcome';
import Login from './pages/welcome pages/login';
import SignUp from './pages/welcome pages/signup';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';



const Layout = () => {
  return (
    <div>
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {
        path:"/",
        element: <Home />,
      },
  
    ],
  },
  {
    path: '/welcome', 
    element: <Welcome />, 
  },
  {
    path: '/login', 
    element: <Login/>
    
  },
  {
    path: '/signup', 
    element: <SignUp />, 
  },
]);

function App() {
  return(
    <div className="font-bodyFont">
       <RouterProvider router = {router} />
    </div>
  )
}

export default App;