import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Context/userContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
    <App />
    </UserProvider>
    <ToastContainer />
    </BrowserRouter>
  </StrictMode>,
)
