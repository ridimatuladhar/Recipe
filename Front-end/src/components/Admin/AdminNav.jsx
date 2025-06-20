import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-nav">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleNavigation('/admin/dashboard')}>Dashboard</li>
          <li onClick={() => handleNavigation('/admin/users')}>Manage Users</li>
          <li onClick={() => handleNavigation('/admin/recipes')}>Manage Recipes</li>
          {/* <li onClick={() => handleNavigation('/admin/settings')}>Settings</li> */}
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;
