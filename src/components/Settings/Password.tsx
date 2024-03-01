import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "../../Service/axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import { styled } from "styled-components";

export type EditPassword = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

const Password = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const initialFormData: EditPassword = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [editForm, setEditForm] = useState<EditPassword>(initialFormData);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    if (editForm.newPassword !== editForm.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(`/users/change-password/${token}`, {
        newPassword: editForm.newPassword,
        password: editForm.password,
        confirmPassword: editForm.confirmPassword,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully");
        navigate("/login");
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // function togglePasswordVisibility(event: MouseEvent<HTMLInputElement, MouseEvent>): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <Security>
      <div>
        <h2>Reset Password</h2>
        <form>
          <div className="old">
            <label htmlFor="old-password">Old Password</label>
            <input
              style={{ position: "relative" }}
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
              className="mail.box"
              value={editForm.password}
              onChange={handleChange}
              name="password"
            />
            <span
              style={{
                position: "absolute",
                top: "45%",
                right: "425px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}>
              {passwordVisible ? <BsEye /> : <BsEyeSlash />}
            </span>
          </div>
          <div className="old">
            <label htmlFor="new-password">New Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
              className="mail.box"
              value={editForm.newPassword}
              onChange={handleChange}
              name="newPassword"
            />
            <span
              style={{
                position: "absolute",
                top: "36%",
                right: "425px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}>
              {passwordVisible ? <BsEye /> : <BsEyeSlash />}
            </span>
          </div>
          <div className="old">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="mail.box"
              placeholder="********"
              value={editForm.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            //onClick={togglePasswordVisibility}
            />
            <span
              style={{
                position: "absolute",
                top: "27%",
                right: "425px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}>
              {passwordVisible ? <BsEye /> : <BsEyeSlash />}
            </span>
          </div>
          <div className="but" style={{ width: "50%" }}>
            <button onClick={onSubmit}>
              <BeatLoader
                color="#fff"
                loading={loading}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <a>Save Changes</a>
            </button>
          </div>
        </form>
      </div>
    </Security>
  );
};

export default Password;

const Security = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
  /* margin-right: 400px; */

  button{
    background-color: inherit;
    border: none;
    color: white;
  }

  h2 {
    font-family: "Montserrat Alternates";
    font: 500;
    size: 18px;
    margin-top: 5px;
    color: black;
  }

  .old {
    font-family: "Montserrat", sans-serif;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin-right: 400px;

    @media screen and (max-width: 600px) {
      font-size: 14px;
      line-height: 18px;
      width: 100%;
    }
    /* display: flex;
    flex-direction: column;
    margin-top: 20px; */
  }

  input {
    width: 400px;
    height: 40px;
  }

  label {
    margin-top: 10px;
    font-family: "Montserrat";
    font-weight: 400px;
  }

  .mail-box {
    width: 90%;
    //margin: auto;
    height: 30px;
    top: 20px;
    padding: 15px;
    border-radius: 6px;
    border: 1px;
    gap: 10px;
    background: white;
    border: 1px solid rgba(213, 215, 222, 1);

    @media screen and (max-width: 600px) {
      width: 90%;
      margin: auto;
    }
  }
  
  .but {
    background-color: #0000cd;
    text-decoration: none;
    border-radius: 16px;
    padding-top: 10px;
    height: 40px;
    text-align: center;
    margin-top: 40px;
    cursor: pointer;

    /* .send-btn {
    width: 90%;
    margin: auto;
    height: 44px;
    padding: 12px, 16px, 12px, 16px;
    border-radius: 8px;
    gap: 8px;
    background-color: rgba(0, 0, 205, 1); */

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;
