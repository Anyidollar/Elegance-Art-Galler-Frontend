import styled from "styled-components";
import "../../src/index.css";
import BackgroundPic from "../assets/backgroundPic.svg";
import { FormEvent, useState } from "react";
import { string } from "zod";
import axios from "../Service/axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

const emailSchema = string().email("Invalid email address");

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoading(!loading);
      const validationResult = emailSchema.safeParse(email);
      if (validationResult.success) {
        console.log("Email is valid:", email);
        const response = await axios
          .post("/users/forget-password", { email })
          .then((res) => {
            const data = res.data;
            console.log(res);
            if (res.statusText == "OK") {
              toast.success("Check your email to reset your password...");
              setLoading(false);
              setEmail("");
              console.log("Check your email to reset your password...");
            }
          });

        setValidationError("");
      } else {
        setValidationError(validationResult.error.message);
      }
    } catch (err) {
      console.log(err);
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

          <div className="enter">
            <p className="enter-your">
              Enter your email below and we'll send you instructions <br /> on
              how to reset your password.
            </p>
          </div>
        </div>
        <form>
          <div className="div2">
            <label htmlFor="" className="email">
              Email
            </label>
            <input
              type="email"
              className="mail-box"
              placeholder="ayomidefatogun@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {validationError && (
              <div className="error">Invalid email address</div>
            )}
            <br />

            <button className="send-btn send-txt" onClick={handleSubmit}>
              <BeatLoader
                color="#fff"
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Send reset instructions
            </button>
            <br />

            <h6 className="go-back">
              Go back to{" "}
              <a className="sign" href="#">
                Sign in
              </a>
            </h6>
          </div>
        </form>
      </MotherDiv>
    </BackgroundDiv>
  );
};

export default ForgotPassword;

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
    font-size: 16px;
    font-family: "Montserrat";
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

  .error {
    color: red;
    font-size: 12px;
    font-family: "Montserrat Alternates", sans-serif;
  }

  .enter-your {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    padding-bottom: 10px;
    letter-spacing: 0em;
    text-align: center;
    color: rgba(152, 162, 179, 1);
  }

  .div2 {
    font-family: "Montserrat", sans-serif;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 16px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0em;

    @media screen and (max-width: 600) {
      font-size: 14px;
      line-height: 18px;
      width: 100%;
    }
  }

  .mail-box {
    width: 95%;
    height: 25px;
    top: 22px;
    font-family: "Montserrat";
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    padding: 15px;
    border-radius: 6px;
    border: 1px;
    gap: 10px;
    background: rgba(213, 215, 222, 1);
    border: 1px solid rgba(213, 215, 222, 1);

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
    margin: auto;
    /* padding: 12px, 16px, 12px, 16px; */
    border-radius: 8px;
    gap: 8px;
    background-color: rgba(0, 0, 205, 1);
    cursor: pointer;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }

  .go-back {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    padding-top: 40px;
  }

  a {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
  }

  .sign {
    text-decoration: underline;
    color: blue;
  }
`;
