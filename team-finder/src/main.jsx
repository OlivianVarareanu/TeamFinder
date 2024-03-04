import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import RoutingComponent from './components/RoutingComponent/RoutingComponent.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
    <BrowserRouter>
       <RoutingComponent />
    </BrowserRouter>
  </React.StrictMode>
 
)
