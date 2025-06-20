import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import axios from 'axios';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      // Refresh the user list
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="manage-users">
        <h3>Manage Users</h3>
        {error && <p className="error">{error}</p>}
        <table className="user-table">
          <thead>
            <tr>
                <th>Profile</th>            
              <th>Name</th>
              <th>Email</th>
              <th>Bio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user._id}>
                    <td>{user.profilePicture}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.bio}</td>
                  <td>
                    <button onClick={() => handleDelete(user._id)} className="btn-delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
