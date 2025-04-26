import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = (props) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error('Failed to log out');
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${props.darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">{props.title}</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            
            {currentUser && (
              <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center search-controls">
                <input
                  className="form-control me-lg-2 mb-2 mb-lg-0"
                  type="search"
                  placeholder="Search todos..."
                  value={props.searchTerm}
                  onChange={(e) => props.setSearchTerm(e.target.value)}
                />
                <select
                  className="form-select me-lg-2 mb-2 mb-lg-0"
                  value={props.selectedCategory}
                  onChange={(e) => props.setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            )}
            
            <div className="d-flex align-items-center mt-3 mt-lg-0">
              {currentUser ? (
                <>
                  <span className="me-3 d-none d-lg-inline">{currentUser.email}</span>
                  <button className="btn btn-outline-danger me-2" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn btn-primary me-2">Login</Link>
              )}
              <button 
                className={`btn ${props.darkMode ? 'btn-light' : 'btn-dark'}`}
                onClick={props.toggleTheme}
              >
                {props.darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {currentUser && (
        <div className="container-fluid py-2">
          <div className="progress" style={{ height: '25px' }}>
            <div 
              className="progress-bar bg-success" 
              role="progressbar" 
              style={{ width: `${props.progress}%` }}
              aria-valuenow={props.progress} 
              aria-valuemin="0" 
              aria-valuemax="100"
            >
              {props.progress}% Complete
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
  darkMode: PropTypes.bool,
  toggleTheme: PropTypes.func,
  progress: PropTypes.number
};

export default Header;