import styled from "styled-components";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import BackgroundPic from "../assets/backgroundPic.svg";
import googleIcon from "../components/images/goggle.svg";
import { loginUser, getUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";

export const BackgroundDiv = styled.div`
	background: url(${BackgroundPic});
	height: 100vh;
	background-attachment: fixed;
	background-position: center;
	background-size: cover;
	overflow: hidden;
`;

const MotherDiv = styled.div`
	width: 500px;
	display: flex;
	flex-direction: column;
	gap: 4px;
	height: 510px;
	padding: 32px;
	margin: 31px auto;
	border-radius: 16px;
	background-color: rgba(255, 255, 255, 1);
	box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.16);
	/* z-index: 1; */

	@media screen and (max-width: 600px) {
		width: 85%; /* Adjust the width for smaller screens */
		height: 80%; /* Adjust the height for smaller screens */
		margin: 25px auto;
		align-items: center;
		padding: 10%;
		border-radius: 0%;
	}

	.div1 {
		text-align: center;

		element.style {
			margin-top: 0%;
			height: 38%;
		}
	}

	.artistic {
		font-family: "Freestyle Script", sans-serif;
		font-size: 36px;
		font-weight: 400;
		/* line-height: 42px; */
		margin-bottom: 2px;
		margin-top: 4px;
		letter-spacing: 0em;
		color: rgba(0, 0, 205, 1);

		@media screen and( max-width: 600px) {
			font-size: 24px;
			line-height: 30px;
		}
	}

	.welcometext {
		color: var(--Main-Text, #101828);

		/* Artistic Header */
		font-family: Montserrat Alternates;
		font-size: 24px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		margin-bottom: 5px;
	}

	.div2 {
		font-family: "Montserrat";
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 100%;
		font-size: 14px;
		font-weight: 300;
		line-height: 20px;
		letter-spacing: 0em;
		text-align: left;
		color: var(--Main-Text, #101828);
		@media screen and( max-width: 600px) {
			font-size: 14px;
			line-height: 18px;
			width: 90%;
			margin: auto;
		}
	}

	.mail-box {
		width: 100%;
		height: 40px;
		top: 10px;
		padding: 2px;
		border-radius: 6px;
		border: 1px;
		display: flex;
		gap: 4px;
		background: rgba(213, 215, 222, 1);
		border: 1px solid rgba(213, 215, 222, 1);
		@media screen and( max-width: 600px) {
			width: 100%;
			margin: auto;
		}
	}

	.send-txt {
		font-family: "Inter", sans-serif;
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		letter-spacing: 0px;
		color: rgba(255, 255, 255, 1);
		margin-bottom: 4px;

		@media screen and (max-width: 600px) {
			font-size: 12px;
			margin-bottom: 2px;
		}
	}

	.send-btn {
		width: 100%;
		height: 45px;
		padding: 15px, 16px, 15px, 16px;
		border-radius: 8px;
		gap: 8px;
		background-color: rgba(0, 0, 205, 1);
		cursor: pointer;

		@media screen and( max-width: 600px) {
			width: 100%;
			margin: auto;
		}
	}
`;

const SignInLink = styled.a`
	color: var(--primary-royal-blue, #0000cd);
	font-family: "Inter";
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	line-height: 20px;
	text-decoration-line: underline;
	@media screen and (max-width: 600px) {
		font-size: 12px;
	}
`;
const Icon = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 10px;
	border: none;
`;
const OrText = styled.div`
	color: var(--Grey-400, #98a2b3);

	/* Button Normal - 14 */
	font-family: Inter;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px; /* 142.857% */
	text-align: center;
	@media screen and (max-width: 600px) {
		font-size: 12px;
		align-items: center;
	}
`;
const ForgotPasswordLink = styled.a`
	color: var(--Blue-600, #1570ef);

	/* Artistic Body */
	font-family: "Montserrat";
	font-size: 16px;
	font-style: normal;
	font-weight: 300;
	line-height: normal;
`;

const StyledParagraph = styled.p`
	color: var(--Grey-400, #98a2b3);
	font-family: Inter;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	text-align: center;
	margin-top: 1px;
	@media screen and (max-width: 600px) {
		font-size: 12px;
		line-height: 18px;
		margin-top: 0;
	}
`;

const Placeholder = styled.div`
	a {
		display: flex;
		text-decoration: none;
	}
	color: var(--Grey-400, #98a2b3);

	/* Button Normal - 14 */
	font-family: Inter;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px; /* 142.857% */
	height: 40px; /* Example height */
	display: flex;
	width: 100%;
	padding: 12px 16px;
	justify-content: center;
	align-items: center;
	gap: 8px;
	border-radius: 8px;
	border: 1px solid var(--Grey-300, #d0d5dd);

	@media screen and( max-width: 600px) {
		margin: auto;
		width: 100%;
	}
`;

export type LoginDataType = {
	email: string;
	password: string;
};

const Login = () => {
	const loader = useSelector((state) => state.user.loading);

	const dispatch = useDispatch();
	const initialFormData: LoginDataType = {
		email: "",
		password: "",
	};
	const navigate = useNavigate();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [formData, setFormData] = useState<LoginDataType>(initialFormData);
	// const [loading, setLoading] = useState(false);
	// const [errors, setErrors] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		localStorage.removeItem("username");
		localStorage.removeItem("user");
	}, []);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			console.log("Loader", loader);
			loginUser(formData, dispatch).then((res) => {
				if (res.data.error) {
					toast.error(res.data.error);
					res.data.error == "Please verify your email" ? navigate("/verify-user") : null;
					console.log(res.data.error);
				}
				if (res.statusText == "OK") {
					toast.success(res.data.message);
					localStorage.setItem("user", res.data.user);
					console.log(res);
					navigate("/dashboard/main");
				}
			});

			// const response = axios
			// 	.post("/users/login", formData)
			// 	.then((res) => {
			// 		const data = res.data;
			// 		// console.log(res.data);
			// 		if (res.statusText == "OK") {
			// 			toast.success(res.data.message);
			//             localStorage.setItem("user", res.data.user);
			// 			localStorage.setItem("username", res.data.user.firstname);
			// 			console.log("Login Successful");
			// 			navigate("/dashboard");
			// 		} else {
			// 			setLoading(!loading);
			// 			console.log("Invalid credentials");
			// 		}

			// 		// setFormData(initialFormData);
			// 	})
			// 	.catch((err) => {
			// 		toast.error(err.response.data.error);
			// 		err.response.data.error == "Please verify your email" ? navigate("/verify-user") : null;
			// 		console.log(err.response.data.error);
			// 	});
			// setLoading(!loading);
		} catch (err) {
			console.log(err);
			// Handle errors during the login process
		}
	};

	useEffect(() => {
		getUser(dispatch);
	}, []);

	return (
		<BackgroundDiv>
			<MotherDiv>
				<div className="div1">
					<div className="write-up">
						<p className="artistic">Artistic Elegance Gallery</p> <br />
						<p className="welcometext">Welcome back</p>
					</div>
				</div>
				<Placeholder>
              <a href="http://localhost:3000/auth/google">
                <Icon src={googleIcon} alt="Google Icon" />
                Sign in with Google
              </a>
            </Placeholder>
				<OrText>
					<img src="src/components/images/Frame 40.png" alt="frame 40" />
				</OrText>
				<div className="div2">
					<label htmlFor="" className="email">
						Email
					</label>
					<input
						type="email"
						className="mail-box"
						placeholder="ayomidefatogun@gmail.com"
						value={formData.email}
						onChange={handleInputChange}
						name="email"
					/>

					<label htmlFor="" className="password">
						Password
					</label>
					<div style={{ position: "relative" }}>
						<input
							type={passwordVisible ? "text" : "password"}
							className="mail-box"
							placeholder="**********"
							value={formData.password}
							onChange={handleInputChange}
							name="password"
						/>
						<span
							style={{
								position: "absolute",
								top: "50%",
								right: "10px",
								transform: "translateY(-50%)",
								cursor: "pointer",
							}}
							onClick={togglePasswordVisibility}>
							{passwordVisible ? <BsEye /> : <BsEyeSlash />}
						</span>
					</div>
					<p>
						<ForgotPasswordLink href="/forgot-password">Forgot password</ForgotPasswordLink>
					</p>
					<br />
					<button className="send-btn send-txt" onClick={onSubmit}>
						<BeatLoader
							color="white"
							loading={loader}
							// cssOverride={override}
							size={10}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
						Login
					</button>
					<br />
					<StyledParagraph>
						Don’t have an account ? <SignInLink href="/register">Sign up here</SignInLink>
					</StyledParagraph>
				</div>
			</MotherDiv>
		</BackgroundDiv>
	);
};
export default Login;
