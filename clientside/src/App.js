import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './navigationStack/navigation';
import { BrowserRouter } from 'react-router-dom';

export const baseURL="http://localhost:8000"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
   <Navigation/>
   
    </div>

    </BrowserRouter>
  );
}

export default App;
