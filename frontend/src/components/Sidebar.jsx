import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      name: 'Dashboard',
      icon: '📊'
    },
    {
      path: '/ad-management',
      name: 'Gestión de Anuncios',
      icon: '📢'
    },
    {
      path: '/ad-server',
      name: 'Entrega de Anuncios',
      icon: '🚀'
    },
    {
      path: '/reports',
      name: 'Reportes',
      icon: '📈'
    },
    {
      path: '/consent-privacy',
      name: 'Consentimiento y Privacidad',
      icon: '🔒'
    }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">DoubleClick</h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {isOpen && <span className="nav-text">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
