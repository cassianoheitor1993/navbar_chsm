import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import DOMPurify from 'dompurify';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = ({
  title = 'Amazing Blog',
  links = [],
  showNotifications = true,
  websocketUrl = null,
  customStyles = {
    navbar: { backgroundColor: '#333' },
    title: { color: '#fff' },
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const stripHtmlAndTruncate = (htmlString, maxLength) => {
    const cleanText = DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    return cleanText.length > maxLength ? `${cleanText.substring(0, maxLength)}...` : cleanText;
  };

  const handleDeletedArticle = useCallback((data) => {
    const articleIds = Array.isArray(data.article_id)
      ? data.article_id.map(String)
      : [data.article_id?.toString()];
    setNotifications((prev) => {
      const updated = prev.filter((n) => !articleIds.includes(n.article_data?.id?.toString()));
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    if (websocketUrl) {
      const ws = new WebSocket(websocketUrl);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.message === 'Article deleted') {
            handleDeletedArticle(data);
          } else if (data.message === 'New article') {
            setNotifications((prev) => {
              const newNotifications = [...prev, data];
              localStorage.setItem('notifications', JSON.stringify(newNotifications));
              return newNotifications;
            });
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => console.log('WebSocket closed');

      return () => ws.close();
    }
  }, [websocketUrl, handleDeletedArticle]);

  const dismissNotification = (index) => {
    setNotifications((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

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
          <ul className="nav-links">
            {links?.map(({ path, label }, idx) => (
              <li key={idx} className="nav-item">
                <NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          {showNotifications && (
            <div className="notification-icon" onClick={toggleDropdown}>
              {showDropdown ? (
                <i className="bi bi-bell-fill"></i>
              ) : (
                <i className="bi bi-bell"></i>
              )}
              {notifications.length > 0 && (
                <span className="notification-count">{notifications.length}</span>
              )}
              {showDropdown && (
                <div className="notification-dropdown">
                  <ul>
                    {notifications.length > 0 ? (
                      notifications.map((notification, idx) => (
                        <li key={idx} className="notification-item">
                          <div className="notification-content">
                            <h6>{notification.article_data?.title || 'Untitled'}</h6>
                            <button
                              className="dismiss-button"
                              onClick={() => dismissNotification(idx)}
                            >
                              Dismiss
                            </button>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>No notifications</li>
                    )}
                  </ul>
                </div>
              )}
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
  websocketUrl: PropTypes.string,
  customStyles: PropTypes.shape({
    navbar: PropTypes.object,
    title: PropTypes.object,
  }),
};

export default Navbar;
