import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './navigationStack/navigation';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const baseURL="https://e-commerce-backend-xmh5.onrender.com"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
   <Navigation/>
   <ToastContainer/>
    </div>

    </BrowserRouter>
  );
}

export default App;
