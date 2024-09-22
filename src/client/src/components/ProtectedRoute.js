import React from "react";
import { Navigate } from "react-router-dom";
import * as session from '../utils/SessionUtils.js'; 

export default function ProtectedRoute({ children }) {
	if (!session.getJwtToken()) {
		return <Navigate to="/signin" replace />;
	}
	return children;
}
