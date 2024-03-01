import React, { FormEvent, useState } from 'react';
import styled from "styled-components";
import "../../src/index.css";
import BackgroundPic from "../assets/backgroundPic.svg";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import axios from '../Service/axios';


const Verify = () => {


const navigate = useNavigate();
const [ code ,  setCode ] = useState("");

 
 const token = localStorage.getItem("token");

 // Check if the key exists
 if (token !== null) {
     // Data exists; you can use it
     console.log("Retrieved token: " + token);
 } else {
     console.log("token does not exist in local storage");
 }

 



  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(code)
      try {
        await axios
          .post(`/users/verify`, { code: code })
          .then((res) => {
            
            if (res.statusText == 'OK') {

              toast.success(res.data.message)
              console.log("User Verified Successfully");

              navigate("/login");
            } else if (res.status == 404) {
              console.log("User Already Verified Successfully");
            }
          });
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
            <p className="reset-text">Verification</p>
          </div>

          <div className="enter">
            <p className="enter-your">
              Enter the OTP sent to your email
            </p>
          </div>
        </div>
<form>
<div className="div2">
          <label htmlFor="" className="otp">
            {/* Enter OTP */}
          </label>
          <input
            type="text"
            className="mail-box"
            placeholder="Enter OTP"
            onChange={(e) => setCode(e.target.value)}/>
          <br />

          <button className="send-btn send-txt" onClick={handleSubmit}>
              Submit
          </button>
          <br />

          <h6 className="go-back">
            Didn't get an OTP? {" "}
            <a className="sign" href="/resend-otp">
              <strong> Resend Otp </strong>
            </a>
          </h6>
        </div>
</form>
     
      </MotherDiv>
    </BackgroundDiv>
  );
};

export default Verify;


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

  /* @media screen and (max-width: 640px) {
    width: 100% ;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 7px;
  height: 70%; */

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
  /* .reset-text {
    font-size: 12px;
    font-weight: 250;
    line-height: 18px;
    letter-spacing: 0em;
  } */

  
  }

  .div1 {
    text-align: center;
  }

  .artistic {
    font-family: "Freestyle Script", sans-serif;
    font-size: 290%;
    font-weight: 400;
    line-height: 42px;
    letter-spacing: 0em;
    color: rgba(0, 0, 205, 1);
    margin-top: 11px;
    margin-bottom: 84px;

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
    margin-top: -86px;
  
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
    
    @media screen and (max-width: 600px) {
      font-size: 14px;
      line-height: 18px;
      width: 100%;

    }
  }

  .mail-box {
    width: 90%;
    margin: auto;
    height: 30px;
    top: 20px;
    padding: 15px;
    border-radius: 6px;
    border: 1px;
    gap: 10px;
    background: rgba(213, 215, 222, 1);
    border: 1px solid rgba(213, 215, 222, 1);

    @media screen and (max-width: 600px) {
      width: 90%;
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
    width: 90%;
    margin: auto;
    height: 44px;
    padding: 12px, 16px, 12px, 16px;
    border-radius: 8px;
    gap: 8px;
    background-color: rgba(0, 0, 205, 1);

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
    z-index: 1;
  }

  .sign {
    text-decoration: underline;
    color: blue;
  }
`;