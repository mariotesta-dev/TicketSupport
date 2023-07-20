import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ jwtToken, children }) {
	if (!jwtToken) {
		return <Navigate to="/signin" replace />;
	}
	return children;
}
