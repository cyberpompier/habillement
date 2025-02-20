import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <ul className="footer-list">
          <li className="footer-item">
            <a href="#" className="footer-link">
              <i className="fas fa-users"></i>
              Personnel
            </a>
          </li>
          <li className="footer-item">
            <a href="#" className="footer-link">
              <i className="fas fa-tshirt"></i>
              Habillement
            </a>
          </li>
        </ul>
      </nav>
      <p>&copy; 2023 Habillement</p>
    </footer>
  );
}

export default Footer;
