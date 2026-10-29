import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  {store , persistor}  from './Redux/store.js'
import { Provider } from 'react-redux';
// import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// const persistor = persistStore(store);
createRoot(document.getElementById('root')).render(
  <StrictMode>
     
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  
  
  </StrictMode>,
)
