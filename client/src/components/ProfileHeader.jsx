import React from 'react';

const ProfileHeader = ({ user }) => (
  <div>
    <h1>Profile</h1>
    <h2>Name: {user.fullname}</h2>
    <p>Email: {user.email}</p>
    <p>Role: {user.role}</p>
  </div>
);

export default ProfileHeader;
