import React from 'react';
import Home from './Component/Home';
import Header from './Component/Header';
import './Component/App.css';
import './Component/Header.css';
import axios from "axios";

function App() {
  const feax = async () => {
    const a = await axios.get("https://localhost:7161/api/Ticket");
    console.log(a);
  }
  return (
    <div className="App">
      <Header/>     
      <Home/>
    </div>
  );
}
export default App;
