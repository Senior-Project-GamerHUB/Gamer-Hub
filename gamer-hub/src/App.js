import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Welcome from './pages/welcome pages/welcome/welcome';
import Login from './pages/welcome pages/login/login';
import SignUp from './pages/welcome pages/signup/signup';
import Header from './header';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import IndividualGame from "./pages/individualgame/individualgame";
import Submit from "./pages/submit/submit";
import Submit2 from "./pages/submit2/submit2";
import Profile from "./pages/profile/profile";
import Forum from "./pages/forum/forum";
import Forum2 from "./pages/forum/forum2/forum2";
import PostPage from "./pages/forum/forum2/postPage/postPage";
import NotFound from './pages/notfound/notfound';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />, 
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'game/:appid',
        element: <IndividualGame />,
      },
      {
        path: '/submit',
        element: <Submit />,
      },
      {
        path: '/submit/game/:appid',
        element: <Submit2/>,
      },
      {
        path: '/profile/user/:user',
        element: <Profile />,
      },
      {
        path: '/forum',
        element: <Forum />,
      },
      {
        path: '/forum/game/:appid',
        element: <Forum2/>,
      },
      {
        path: '/forum/post/:postid',
        element: <PostPage/>,
      },
      {
        path: '*', 
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  
]);

function App() {


  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;