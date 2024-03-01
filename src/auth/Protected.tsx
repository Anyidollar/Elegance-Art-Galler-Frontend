import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
	children: string | JSX.Element | JSX.Element[];
};

const Protected = ({ children }: Props) => {
	const token = localStorage.getItem("token");

	if (!token) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default Protected;
