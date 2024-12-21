// ManageUsers.js
import React, { useState } from 'react';
import './ManageUsers.css';

function ManageUsers() {
  const [users, setUsers] = useState([
    // This is mock data. In a real app, you'd fetch this from your backend.
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active' },
    // ... other users
  ]);
  
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '', // In a real app, ensure to handle passwords securely
  });

  // Handlers for form inputs and buttons
  const handleNewAdminChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    // Submit new admin data to backend, and update state accordingly
    console.log(newAdmin);
  };

  const handleUpdateUser = (userId) => {
    // Logic to update user info. You will likely open a form with user details.
    console.log('Update user with ID:', userId);
  };

  const handleDeleteUser = (userId) => {
    // Logic to delete a user. After confirmation, make a request to your backend.
    console.log('Delete user with ID:', userId);
  };

  const handleSuspendUser = (userId) => {
    // Logic to suspend a user. This would toggle the user's status and update the backend.
    console.log('Suspend user with ID:', userId);
  };

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>
      <div className="form-group">
      <form onSubmit={handleAddAdmin}>
        <h3>Add New Administrator</h3>
        <input type="text" name="name" placeholder="Full Name" value={newAdmin.name} onChange={handleNewAdminChange} />
        <input type="email" name="email" placeholder="Email" value={newAdmin.email} onChange={handleNewAdminChange} />
        <input type="password" name="password" placeholder="Password" value={newAdmin.password} onChange={handleNewAdminChange} />
        <button type="submit">Add Admin</button>
      </form>
      </div>

      <h3>Current Users</h3>
      <table className="table-users">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td className="action-buttons">
                <button onClick={() => handleUpdateUser(user.id)}>Update</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                <button onClick={() => handleSuspendUser(user.id)}>{user.status === 'active' ? 'Suspend' : 'Activate'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;

