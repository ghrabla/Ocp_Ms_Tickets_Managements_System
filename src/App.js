import React from 'react';
import TicketList from './Component/TicketList';
import Header from './Component/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketDetails from './Pages/TicketDetails';
import TicketCreate from './Pages/TicketCreate';
import TicketUpdate from './Pages/TicketUpdate';
import './Component/App.css';
import './Component/Header.css';



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/create" element={<TicketCreate />} />
          <Route path="/update/:id" element={<TicketUpdate />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
