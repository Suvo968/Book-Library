import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routers/router.jsx';
import AuthProvider from './contects/AuthProvider.jsx'; // Ensure the path is correct
import { CartProvider } from './contects/CartContext'; // Import CartProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <CartProvider> {/* Wrap the entire app with CartProvider */}
        <RouterProvider router={router} /> {/* Render the router */}
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);