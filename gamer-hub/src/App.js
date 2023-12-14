import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
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

const ProtectedRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/loggedIn`, {
          withCredentials: true,
        });

        if (response.data[0]?.username) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          if (pathname !== '/login') {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        if (pathname !== '/login') {
          navigate('/login');
        }
      }
    };

    checkAuthentication();
  }, [pathname, navigate]);

  return isAuthenticated ? element : null;
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
        element: <ProtectedRoute element={<Home />} />,
      },
      {
        path: 'game/:appid',
        element: <ProtectedRoute element={<IndividualGame />} />,
      },
      {
        path: '/submit',
        element: <ProtectedRoute element={<Submit />} />,
      },
      {
        path: '/submit/game/:appid',
        element: <ProtectedRoute element={<Submit2 />} />,
      },
      {
        path: '/profile/:userName/:userID',
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: '/forum',
        element: <ProtectedRoute element={<Forum />} />,
      },
      {
        path: '/forum/game/:appid',
        element: <ProtectedRoute element={<Forum2 />} />,
      },
      {
        path: '/forum/post/:postId',
        element: <ProtectedRoute element={<PostPage />} />,
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
  );
}

export default App;