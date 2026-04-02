import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from './App.jsx';
import "./index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={App} />
    </AuthProvider>
  </StrictMode>,
)
