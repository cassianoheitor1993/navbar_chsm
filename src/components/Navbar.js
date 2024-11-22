import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = ({
  title = 'Amazing Blog',
  links = [],
  showNotifications = true,
  notificationPlaceholder = null,
  customStyles = {
    navbar: { backgroundColor: '#333' },
    title: { color: '#fff' },
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar" style={customStyles.navbar}>
      <div className="nav-header">
        <h1 className="nav-title" style={customStyles.title}>
          <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
            {title}
          </NavLink>
        </h1>
        <button className="menu-button" onClick={toggleMenu}>
          <i className={`bi bi-${isOpen ? 'x' : 'list'}`}></i>
        </button>
        <div className={`nav-links-container ${isOpen ? 'open' : ''}`}>
          <ul className="nav-links ${isOpen ? 'open' : ''}">
            {links?.map(({ path, label }, idx) => (
              <li key={idx} className="nav-item">
                <NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          {showNotifications && notificationPlaceholder && (
            <div className="notification-placeholder">
              {notificationPlaceholder}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  showNotifications: PropTypes.bool,
  notificationPlaceholder: PropTypes.node,
  customStyles: PropTypes.shape({
    navbar: PropTypes.object,
    title: PropTypes.object,
  }),
};

export default Navbar;
