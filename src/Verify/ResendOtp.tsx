import styled from "styled-components";
import "../../src/index.css";
import Verify from "./Verify";
import React, { FormEvent, useState, ChangeEvent } from 'react';
import BackgroundPic from "../assets/backgroundPic.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../Service/axios';
import { string } from "zod";
import { isEmailValid } from './utils/emailValidation';
import { toast } from 'react-toastify';





const ResendOtp: React.FC = () => {
  const [ email ,  setEmail ] = useState("");
  const navigate = useNavigate();

  const [message, setMessage] = useState("")
  const handleVerification = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(email)
    //  {
    //   email: email,
    // };
    try {
      const response = await axios
      .post("/users/resendOTP", {email: email})
      .then((res) => {
      const data = res.data;
      setMessage("check your mail for OTP code");
      setTimeout(() => {
        setMessage("Please wait");
      }, 1000);
      toast.success(res.data.message)
        navigate("/verify-user");
     
    });

    } catch (error: any) {
      console.log(error.response.data);
    }
  };


  return (
    <BackgroundDiv>
      <MotherDiv>
        <div className="div1">
          <div className="write-up">
            <p className="artistic">Artistic Elegance Gallery</p> <br />
            <p className="reset-text">Resend OTP</p>
          </div>

          <div className="enter">
            <p className="enter-your">
              Enter your email below and we'll send you a new OTP
            </p>
          </div>
        </div>

        <div className="div2">
          <div>
          <label htmlFor="" className="email">
            Email
          </label>
          <input
            type="email"
            // value={email}
            className="mail-box"
            placeholder="ayomidefatogun@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          
          </div>
          <br />

          <button className="send-btn " onClick={handleVerification} >
              <p className="send-txt"><a href="">Resend OTP</a></p>
          </button>
          <br />

          <h6 className="go-back">
            Go back to{" "}
            <a className="sign" href="/login"  >
              Sign in
            </a>
          </h6>
        </div>
      </MotherDiv>
    </BackgroundDiv>
  );
};

export default ResendOtp;


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
/*   
  @media screen and (min-width: 600px){
  width: fit-content;
  display: flex;
  flex-direction: row;
  height: fit-content;
  padding: 32px auto;
  margin: 37px auto;
  border-radius: 16px auto;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.16);
  } */

  @media screen and (max-width: 600px) {
    width: 90% ;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 7px;
  height: auto; /*70%;*/
  padding: 16px;
  
  /* .artistic {
    width: 100% ;
  font-size: 8px;
  margin: auto;
    font-weight: 100;
    line-height: 22px;
    letter-spacing: 0em;

  } */
  .reset-text {
    /* width: 90% ; */

    font-size: 12px;
    font-weight: 250;
    line-height: 18px;
    letter-spacing: 0em;
  }

  .mail-box{
    /* width: 90% ; */

    font-size: 12px;
    font-weight: 250;
    line-height: 18px;
    letter-spacing: 0em;
  }

  .send-btn{
    width: 90% ;

    font-size: 12px;
    font-weight: 250;
    line-height: 18px;
    letter-spacing: 0em;
  }
  .div2{
    /* width: 50% ; */
    margin: auto;

  }

  }

  .div1 {
    text-align: center;
  }

  .artistic {
    font-family: "Freestyle Script", sans-serif;
    font-size: 36px;
    font-weight: 400;
    margin: 2%;
    line-height: 42px;
    letter-spacing: 0em;
    color: rgba(0, 0, 205, 1);
    /* CHATGPT*/
    
    @media screen and (max-width: 600px) {
      font-size: 24px;
      line-height: 30px;
    }
  }

  .reset-text {
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
    margin-top: 0%;

    @media screen and (max-width: 600px) {
      font-size: 18px;
      line-height: 24px;
    }
  }

  .enter-your {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    color: rgba(152, 162, 179, 1);
  }

  .div2 {
    font-family: "Montserrat", sans-serif;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    width: 95%;

    @media screen and (max-width: 600px) {
      font-size: 14px;
      line-height: 18px;
      width: 100%;

    }
  }

  .mail-box {
    width: 436px;
    height: 40px;
    top: 20px;
    padding: 12px, 16px, 12px, 16px;
    border-radius: 8px;
    border: 1px;
    gap: 10px;
    background: rgba(213, 215, 222, 1);
    border: 1px solid rgba(213, 215, 222, 1);

    element.style {
    width: 100%;
}

    @media screen and (max-width: 600px) {
      width: 100%;
      margin: auto;
    }
  }

  .send-txt {
    //styleName: Button Semi Bold - 14;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0px;
    color: rgba(255, 255, 255, 1);
  }

  .send-btn {
    width: 485px;
    height: 44px;
    padding: 12px, 16px, 12px, 16px;
    border-radius: 8px;
    gap: 8px;
    background-color: rgba(0, 0, 205, 1);
    color: rgba(255, 255, 255, 1);

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
  }

  a {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
    color: rgba(255, 255, 255, 1);

  }

  .sign {
    text-decoration: underline;
    color: blue;
  }
`;