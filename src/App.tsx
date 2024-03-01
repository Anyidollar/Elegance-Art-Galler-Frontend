import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./pages/Home";
import Verify from "./Verify/Verify";
import ResendOtp from "./Verify/ResendOtp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./resetPassword/ForgotPassword";
import ResetPassword from "./resetPassword/ResetPassword";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./components/dashboard/Admin";
import Protected from "./auth/Protected";

// import './App.css'

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="/verify-user" element={<Verify />} />
				<Route path="/resend-otp" element={<ResendOtp />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password/:tokenParam" element={<ResetPassword />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="dashboard/*"
					element={
						<Protected>
							<AdminDashboard />
						</Protected>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
