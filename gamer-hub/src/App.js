import React from "react";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Welcome from './pages/welcome pages/welcome/welcome';
import Login from './pages/welcome pages//login/login';
import SignUp from './pages/welcome pages//signup/signup';
import Header from './header';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import IndividualGame from "./pages/individualgame/individualgame";
import Submit from "./pages/submit";
import Profile from "./pages/profile";
import Forum from "./pages/forum";

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
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/', // This will match the root URL
        element: <Home />,
      },
      {
        path: '/game',
        element: <IndividualGame />,
      },
      {
        path: '/submit',
        element: <Submit />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      { 
         path: 'forum',
         element: <Forum/>
      },
    ],
  },
  {
    path: '/welcome', // Place this route at the top
    element: <Welcome />,
  },
  {
    path: '/login',
    element: <Login />,
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