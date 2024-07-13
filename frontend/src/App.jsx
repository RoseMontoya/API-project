
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Welcome!</h1>,
    children: [{
      path: 'login',
      element: <h1>Login</h1>//<LoginFormPage />
    }]
  },
]);

function App() {
  return <LoginFormPage />//<RouterProvider router={router}/>;
}

export default App;
