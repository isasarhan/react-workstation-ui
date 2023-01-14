import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Pages from './components/pages/Pages';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
