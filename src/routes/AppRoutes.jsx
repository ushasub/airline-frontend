import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotAuthorized from "../pages/NotAuthorized";
import ViewAirlines from "../pages/ViewAirlines";
import UploadCSV from "../pages/UploadCSV";
import UserManagement from "../pages/UserManagement";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/view-airlines"
      element={
        <ProtectedRoute>
          <ViewAirlines />
        </ProtectedRoute>
      }
    />

    <Route
      path="/upload"
      element={
        <ProtectedRoute>
          <UploadCSV />
        </ProtectedRoute>
      }
    />

    <Route
      path="/users"
      element={
        <ProtectedRoute>
          <UserManagement />
        </ProtectedRoute>
      }
    />

    <Route path="/unauthorized" element={<NotAuthorized />} />
  </Routes>
);

export default AppRoutes;