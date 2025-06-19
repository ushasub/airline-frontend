import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loading user info...</p>;
  }

  const { name, role } = user;

  // Define what each role can do
  const rolePermissions = {
    "junior-staff": [
      "View airlines"
    ],
    "senior-staff": [
      "View airlines",
      "Add new airline"
    ],
    "senior-tech": [
      "View airlines",
      "Add new airline",
      "Update airline"
    ],
    "admin": [
      "View airlines",
      "Add new airline",
      "Update airline",
      "Delete airline",
      "Manage users"
    ]
  };

  const permissions = rolePermissions[role] || [];

  return (
    <main>
      <h2>Welcome, {name}</h2>
      <h4>Role: {role}</h4>

      <section>
        <h3>You are allowed to:</h3>
        <ul>
          {permissions.map((perm, index) => (
            <li key={index}>{perm}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Dashboard;