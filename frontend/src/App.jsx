import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdManagement from './pages/AdManagement.jsx';
import AdServer from './pages/AdServer.jsx';
import Reports from './pages/Reports.jsx';
import ConsentPrivacy from './pages/ConsentPrivacy.jsx';
import './styles/App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app">
        <Sidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ad-management" element={<AdManagement />} />
            <Route path="/ad-server" element={<AdServer />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/consent-privacy" element={<ConsentPrivacy />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
