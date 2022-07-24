//import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import './estilos.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
// Agregar el objeto de configuración
import { initializeApp } from "firebase/app"

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDauRpn26mhnkUwYw7MbBVvKnQGTDzAv_Y",
  authDomain: "imgswebvinos.firebaseapp.com",
  projectId: "imgswebvinos",
  storageBucket: "imgswebvinos.appspot.com",
  messagingSenderId: "160708562393",
  appId: "1:160708562393:web:480360c1d3289e70875dc8"
};

// iniciar Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  //<StrictMode>
    <App />
  //</StrictMode>
)