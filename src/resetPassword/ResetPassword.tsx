import styled from "styled-components";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { ChangeEvent, FormEvent, useState } from "react";
import BackgroundPic from "../assets/backgroundPic.svg";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import axios from "../Service/axios";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");
const confirmPasswordSchema = z.string();

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useParams().tokenParam;

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const validationResult = passwordSchema.safeParse(newPassword);
    if (!validationResult.success) {
      setPasswordError(validationResult.error.message);
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    // Validate confirm password
    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(!loading);
    // Validation before submitting the form
    const passwordValidationResult = passwordSchema.safeParse(password);
    if (!passwordValidationResult.success) {
      setPasswordError(passwordValidationResult.error.message);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    }

    // If both password and confirm password are valid, you can proceed with your logic
    if (passwordValidationResult.success && password === confirmPassword) {
      // Handle the form submission or other actions here
      console.log("Password and confirm password are valid.");
      try {
        const response = await axios
          .patch(`/users/reset-password/${token}`, {
            password,
            confirmPassword,
          })
          .then((res) => {
            const data = res.data;
            console.log(res);
            if (res.statusText == "OK") {
              toast.success("Password Reset Successfully");
              console.log("Password Reset Successfully");

              navigate("/login");
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <BackgroundDiv>
      <MotherDiv>
        <div className="div1">
          <div className="write-up">
            <p className="artistic">Artistic Elegance Gallery</p> <br />
            <p className="reset-text">Reset your password</p>
          </div>
        </div>
        <form>
          <div className="div2">
            <label htmlFor="" className="email">
              New Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={passwordVisible ? "text" : "password"}
                className="mail-box"
                value={password}
                onChange={handlePasswordChange}
                placeholder="**********"
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <BsEye /> : <BsEyeSlash />}
              </span>
            </div>

            <label htmlFor="" className="email">
              Confirm New Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={passwordVisible ? "text" : "password"}
                className="mail-box"
                placeholder="**********"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <BsEye /> : <BsEyeSlash />}
              </span>
            </div>

            <br />
            <button className="send-btn send-txt" onClick={handleSubmit}>
              <BeatLoader
                color="#fff"
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Reset Password
            </button>
            <br />
          </div>
        </form>
      </MotherDiv>
    </BackgroundDiv>
  );
};

export const BackgroundDiv = styled.div`
  background: url(${BackgroundPic});
  height: 100vh;
  margin: 0;
  padding: 0;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  overflow: hidden;
`;

const MotherDiv = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 432px;
  padding: 32px;
  margin: 37px auto;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.16);
  z-index: 1;

  @media screen and (max-width: 600px) {
    width: 85%;
    border-radius: 10px;
    height: auto;
    padding: 10px;
  }

  .div1 {
    text-align: center;
  }

  .email {
    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
  }

  .artistic {
    font-family: "Freestyle Script", sans-serif;
    font-size: 36px;
    font-weight: 400;
    line-height: 42px;
    letter-spacing: 0em;
    color: rgba(0, 0, 205, 1);

    @media screen and (max-width: 600px) {
      font-size: 12;
      line-height: 15px;
    }
  }

  .reset-text {
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
    padding-bottom: 10px;
  }

  .div2 {
    font-family: "Montserrat", sans-serif;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 19px;
    font-weight: 400;
    line-height: 20px;
    line-height: 15px;

    text-align: left;

    @media screen and (max-width: 600) {
      font-size: 8px;
      line-height: 10px;
      width: 100%;
    }
  }

  .mail-box {
    width: 100%;
    height: 25px;
    top: 22px;
    padding: 15px;
    border-radius: 6px;
    border: 1px;
    margin-bottom: 10px;
    gap: 10px;
    background: rgba(213, 215, 222, 1);
    border: 1px solid rgba(213, 215, 222, 1);
    font-family: "Montserrat";
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;

    @media screen and (max-width: 600px) {
      width: 89%;
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
  }

  .send-btn {
    width: 60%;
    height: 60px;
    padding: 12px, 16px, 12px, 16px;
    border-radius: 8px;
    gap: 8px;
    background-color: rgba(0, 0, 205, 1);
    cursor: pointer;
    margin: auto;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;

export default ResetPassword;
