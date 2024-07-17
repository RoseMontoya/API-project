
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import * as sessionActions from './store/session'
import SpotDetailsPage from "./components/SpotDetailsPage";
import SpotFormPage from "./components/SpotFormPage";
import ManageSpotsPage from "./components/ManageSpotsPage";


const Layout = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)})
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet /> }
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: 'spots/:spotId/edit',
        element: <SpotFormPage formType={'Edit'}/>
      },
      {
        path: 'spots/:spotId',
        element: <SpotDetailsPage />,
      },
      {
        path: 'spots/new',
        element: <SpotFormPage formType={'Create'}/>
      },
      {
        path: 'spots/current',
        element: <ManageSpotsPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
