import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleAdminLoginClick = () => {
    navigate('/admin/adminlogin');
  };

  return (
    <div>
      <div className="footer">
        <div className="footer-section">
          <p className="title">Contact us</p>
          <p>recipecart@gmail.com</p>
          <p>+977 1234567891</p>
        </div>

        <div className="footer-section">
          <p className="title">Admin</p>
          <button onClick={handleAdminLoginClick} className="btn-admin">
            Login as Admin
          </button>
        </div>

        <div className="footer-section">
        <p className="title">Follow us on our social media</p>
    <p>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
    </p>
    <p>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
    </p>
    <p>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a>
    </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
