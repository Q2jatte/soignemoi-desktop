import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import FluxPage from './pages/FluxPage';
import SearchPage from './pages/SearchPage';
import PatientPage from './pages/PatientPage';
import ErrorPage from './pages/Error404';

import './css/_reset.css';
import './css/main.css';


// Toutes les routes de l'app
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/flux',
    element: <FluxPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/patient',
    element: <PatientPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

