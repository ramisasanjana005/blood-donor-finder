import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Register from './components/Register/Register';
import Store from './components/Store/Store';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/store" element={<Store />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
