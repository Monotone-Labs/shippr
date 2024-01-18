import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LandingPage from "./pages/landing.tsx";
import {Providers} from "./Providers.tsx";
import Dashboard from "./pages/dashboard.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Providers>
        <RouterProvider router={router} />
    </Providers>
  </>
)
