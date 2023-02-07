import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import jwtDecode from 'jwt-decode';
import './App.css';
import NavBar from './components/NavBar';
import Pages from './components/pages/Pages';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState({})

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    const data = jwtDecode(jwt)
    setUser(data)
    console.log(user);
  }, [])
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar user={user}/>  
      <Pages />
    </BrowserRouter>
  );
}

export default App;
