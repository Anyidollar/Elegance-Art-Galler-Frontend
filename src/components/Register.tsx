import styled from "styled-components";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import BackgroundPic from "../assets/backgroundPic.svg";
import googleIcon from "../components/images/goggle.svg"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from "react-toastify"
import axios from "../Service/axios";
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
// import Joi, { Schema, ValidationResult } from 'joi';


export type FormDataType = {
    firstname: string;
    surname: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    confirmPassword: string;
};

// const override: CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   };

const Register = () => {
    const navigate = useNavigate()
    const initialFormData: FormDataType = {
        firstname: '',
        surname: '',
        email: '',
        phone: '',
        role: '',
        password: '',
        confirmPassword: '',
    };
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState<FormDataType>(initialFormData);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        setFormData({ ...formData, role: event.target.value });
        console.log("Selected value: " + event.target.value);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(formData)
        try {
            setLoading(!loading)
            const response = axios.post('/users/register', formData).then(res => {
                if (res.status == 201) {
                    toast.success(res.data.message)
                    setLoading(!loading)
                    navigate('/verify-user')

                    console.log("User Created Successfuly, Check your email to activate your account")
                }
            }).catch((err) => {
                setLoading(!loading)
                toast.error(err.response.data.error);
                console.log(err.response.data.error)
            })
            console.log(response)
        } catch (err) {
            console.log(err)
        }

    };



    return (
        <BackgroundDiv>
            <MotherDiv>

                <div className="div1">
                    <div className="write-up">
                        <p className="artistic">Artistic Elegance Gallery</p> <br />
                        <p className="welcometext">Create a new account</p>
                    </div>
                </div>
                <div className="place" >
                    <Placeholder>
                        <a href="http://localhost:5000/google">
                            <Icon src={googleIcon} alt="Google Icon" />
                            Sign up with Google
                        </a>
                    </Placeholder>
                </div>
                <>

                    <OrText>
                        <img src='src/components/images/Frame 40.png' alt="frame 40" />
                    </OrText>

                </>

                <form>
                    <div className="div2">

                        <label htmlFor="" className="email">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="mail-box"
                            placeholder="ayomide"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            name="firstname"
                        />

                        <label htmlFor="" className="email">
                            Surname
                        </label>
                        <input
                            type="text"
                            className="mail-box"
                            placeholder="fatogun"
                            value={formData.surname}
                            onChange={handleInputChange}
                            name="surname"
                        />

                        <label htmlFor="" className="email">
                            Email
                        </label>
                        <input
                            type="text"
                            className="mail-box"
                            placeholder="ayomidefatogun@gmail.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            name="email"
                        />

                        <label htmlFor="" className="email">
                            Phone number
                        </label>
                        <input
                            type="tel"
                            className="mail-box"
                            placeholder="+234 78956789"
                            value={formData.phone}
                            onChange={handleInputChange}
                            name="phone"
                        />
                        <label htmlFor="" className="email">
                            Role
                        </label>
                        <select
                            className="mail-box"
                            onChange={(e) => handleSelectChange(e)}
                            name="role"
                        >
                            <option className="role" value="User">User</option>
                            <option className="role" value="Artist">Artist</option>
                        </select>


                        <label htmlFor="" className="email">
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
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <BsEye /> : <BsEyeSlash />}
                            </span>
                        </div>

                        <label htmlFor="" className="email">
                            Confirm Password
                        </label>
                        <div style={{ position: "relative" }}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className="mail-box"
                                placeholder="**********"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                name="confirmPassword"
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
                        <button className="send-btn send-txt" onClick={onSubmit}>
                            <BeatLoader
                                color="#fff"
                                loading={loading}
                                // cssOverride={override}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            Sign up
                        </button>
                        <br />
                        <StyledParagraph>Already have an account? <SignInLink href="/login">Login here</SignInLink></StyledParagraph>
                    </div>
                </form>

            </MotherDiv>
        </BackgroundDiv>
    )
};



export const BackgroundDiv = styled.div`
  background: url(${BackgroundPic});
  height: 120%;
  margin: 0;
  padding: 0; 
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  overflow: hidden;

  /* @media screen and (max-width: 640px) {
    height: auto;
  } */
`;

const MotherDiv = styled.div`
  background-color: white;
  width: 460px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 840px;
  top: 37px;
  padding: 40px;
  margin:50px auto;
  border-radius: 16px;
  /* background-color: rgba(255, 255, 255, 1); */
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.16);
  z-index: 1;
  @media screen and (max-width: 768px) {
    width: 60%; /* Adjust the width for smaller screens */
    height: 50%; /* Adjust the height for smaller screens */
    margin: auto;
    padding: 10%;
    border-radius: 0%;
  }

  @media screen and ( max-width: 600px){
        font-size: 14px;
        line-height: 18px;
        width: 100%;
        margin: auto;
     }
  

  #write-up{
    background-color: blue;
    margin: 0px;
    line-height: 10px;
  }



  /* form{
    @media screen and ( max-width: 600px){
        font-size: 14px;
        line-height: 18px;
        width: 100%;
        margin: auto;
     }
  } */
  p{
    margin-top: 0px;
    /* background-color: blue; */
  }
 
 .welcometext{
    margin-bottom: 30px;
    color: var(--Main-Text, #101828);
    font-family: 'Montserrat Alternates';
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
 }
  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
    padding: 20px;
  }

/*   
  .artistic {
    width: 100% ;
  font-size: 8px;
  margin: auto;
    font-weight: 100;
    line-height: 22px;
    letter-spacing: 0em;
     @media screen and( max-width: 600px){
        font-size: 24px;
        line-height: 30px;
     } */
        
    /* } */


     .place{
  @media screen and ( max-width: 600px){
    width: 100%;
    margin: auto;
  }

        
     }
 
  
  
  .div22{
    width: 100%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 7px;
  height: 70%;
  @media screen and ( max-width: 600px){
        font-size: 14px;
        line-height: 18px;
        width: 100%;
     }
  }
  
  .place {
  @media screen and ( max-width: 600px){
    width: 100%;
  }}

  .div1 {
    top: 10px;
    margin-bottom: 20px;
    text-align: center;
    padding: 30px auto;
  }

  


  .artistic {
    margin-bottom: 5px;
    font-family: "Freestyle Script", sans-serif;
    font-size: 36px;
    font-weight: 400;
    line-height: 42px;
    letter-spacing: 0em;
    color: rgba(0, 0, 205, 1);

    @media screen and ( max-width: 600px){
        font-size: 24px;
        line-height: 30px;
     }

  }

  .reset-text {
    color: var(--Main-Text, #101828);

/* Artistic Header */
font-family: "Montserrat Alternates";
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: normal;
    
  }

  .div2 {
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 300;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: var(--Main-Text, #101828);

    @media screen and ( max-width: 600px){
        font-size: 14px;
        line-height: 18px;
        width: 80%;
        margin: auto;
     }
  }

  .mail-box {
    width: 100%;
    height: 35px;
    top: 15px;
    padding: 4px;
    border-radius: 3px;
    border: 1px;
    display: flex;
    gap: 6px;
    background: rgba(213, 215, 222, 1);
    border: 1px solid rgba(213, 215, 222, 1);
    @media screen and ( max-width: 768px){
        width: 100%;
        margin: auto;
     }

    @media screen and ( max-width: 600px){
        font-size: 14px;
        line-height: 18px;
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
    height: 40px;
    padding: 12px, 16px, 12px, 16px;
    border-radius: 8px;
    gap: 4px;
    background-color: rgba(0, 0, 205, 1);

  @media screen and ( max-width: 768px) {
    width: 90%;
    margin: auto;
  }
  }
`;


const SignInLink = styled.a`
    color: var(--primary-royal-blue, #0000CD);
    font-family: 'Inter';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    text-decoration-line: underline;


    @media screen and (max-width: 640px) {
    font-size: 12px;
  }
    `;


const Icon = styled.img`
width: 20px; 
height: 20px; 
margin-right: 10px;

`;


const OrText = styled.div`
margin-bottom: 5px;
color: var(--Grey-400, #98A2B3);

/* Button Normal - 14 */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 142.857% */
text-align: center;

@media screen and ( max-width: 600px){
        font-size: 14px;
        line-height: 18px;
        width: 70%;
        margin: auto;
     }

`;



const StyledParagraph = styled.p`
    color: var(--Grey-400, #98A2B3);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; 
    text-align: center;
    margin-top: 2px;
    `;

const Placeholder = styled.div`
    background-color: aliceblue;


    a{
        display: flex;
        text-decoration: none;
    }
  
    color: var(--Grey-400, #98A2B3);
   
    /* Button Normal - 14 */
    font-family: Inter;
    text-decoration: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
        height: 30px; /* Example height */
        display: flex;
        width: 90%;
        padding: 12px 16px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 8px;
        margin-bottom: 10px;
        border: 1px solid var(--Grey-300, #D0D5DD);
        @media screen and ( max-width: 600px){
        margin: auto;
        width: 100%;
     }
     @media screen and ( max-width: 768px){
        width: 70%;
        margin: auto;
     }

     @media screen and ( max-width: 600px){
        margin: auto;
        width: 70%;
     }
    `;
export default Register;