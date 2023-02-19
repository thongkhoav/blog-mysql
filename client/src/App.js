import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import styled from "styled-components";
import "./global.scss";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { useEffect } from "react";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>404 not found</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/single",
  //   element: <Single />,
  // },
  {
    path: "/write",
    element: <Write />,
  },
]);
function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <AppContainer>
      <div className="container">
        <RouterProvider router={router}>
          {currentUser === null && redirect("/login")}
        </RouterProvider>
      </div>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;

  .container {
    width: 1024px;
  }
`;
