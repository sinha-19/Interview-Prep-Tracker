import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="mailto:imsaket123@gmail.com">📧 Email</a>
          <a href="https://github.com/sinha-19" target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
          <a href="linkedin.com/in/saketkumarsinha19" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
        </div>
        <p>© 2024 Saket Kumar Sinha | imsaket123@gmail.com</p>
        <p style={{ fontSize: '0.9rem', opacity: '0.8', marginTop: '0.5rem' }}>
          Built with React.js ⚛️
        </p>
      </div>
    </footer>
  );
};
export default Footer;