/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from "styled-components";
// import { BiSolidCameraPlus } from "react-icons/bi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "../../Service/axios";
import BeatLoader from "react-spinners/BeatLoader";
// import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";
//import { string } from "@hapi/joi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from "react";


export type EditProfile = {
  firstname: string;
  surname: string;
  birthday: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  zipcode: number;
  profilePic: string;
};


const PersonalDetails = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const pic = localStorage.getItem("pic")
  const id = localStorage.getItem("userid")
  const role = localStorage.getItem("role")
  const initialFormData: EditProfile = {
    firstname: "",
    surname: "",
    birthday: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    zipcode: 0,
    profilePic: ""
  };

  const [editForm, setEditForm] = useState<EditProfile>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [imageError, setImageError] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");

  console.log("heyyyyy")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileUpload = async (e: any) => {
    const files = e.target.files; // Access files from the file input event
    const file = files[0]; // Assuming you are handling a single file

    console.log(file);

    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const res = await axios.post(`/users/image`, formData, config);
      console.log(res.data);

      setProfilePic(res.data.imageUrl);
      setEditForm((prev) => ({ ...prev, profilePic: res.data.imageUrl }));
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 500) {
        setError("Something went wrong");
      } else {
        setImageError(error.response?.data?.error);
      }
    }
  };


  const picture = localStorage.getItem("profilePic") as unknown as string

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(!loading);

    const entries = Object.entries(editForm);
    const filteredEntries = entries.filter(([key, value]) => value !== "");
    const newData = Object.fromEntries(filteredEntries);

    console.log('data', newData)

    try {
      const data = await axios.patch(
        role === "User" ? `/users/update/${token}` : `/artist/update/${token}`,
        newData
      );
      console.log(data)
      if (data.status == 200) {
        setLoading(false);
        toast.success( "update Successful");
        // toast.success(data.data.message);
        navigate("/dashboard/setting");
        console.log("User Created Successfully");
      } else {
        setLoading(!loading);
      }
    } catch (err) {
      setLoading(!loading);
      toast.error("An error occurred");
      // console.log(err.response?.data?.error);
    }
  };

  // const onSubmit = () => {
  //   console.log("form")
  // }
  // const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.log(editForm);
  //   try {
  //     setLoading(!loading);
  //     const data = axios
  //       .post("/users/update", editForm)
  //       .then((res) => {
  //         const response = res.data;
  //         if (res.status == 201) {
  //           toast.success(res.data.message);
  //           setLoading(!loading);
  //           navigate("/users/update");

  //           console.log(
  //             "User Created Successfuly, Check your email to activate your account"
  //           );
  //         }
  //       })
  //       .catch((err) => {
  //         setLoading(!loading);
  //         toast.error(err.response.data.error);
  //         console.log(err.response.data.error);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Details>
      <form onSubmit={handleSubmit}>
        <div className="cards">
          <Pd>
            <h2>Edit your Profile</h2>
            <Form>
              <div className="div2">
                <div className="sur">
                  <label htmlFor="surname">Surname</label>
                  <input
                    type="text"
                    className="mail-box"
                    placeholder="Fatogun"
                    value={editForm.surname}
                    onChange={handleChange}
                    name="surname"
                  />
                </div>
                <div className="sur">
                  <label htmlFor="firstname">Firstname</label>
                  <input
                    className="mail-box"
                    type="text"
                    placeholder="Ayomide"
                    value={editForm.firstname}
                    onChange={handleChange}
                    name="firstname"
                  />
                </div>
                <div className="sur">
                  <label htmlFor="birthday">BirthDay</label>
                  <input
                    className="mail-box"
                    type="date"
                    placeholder="05/01/2000"
                    value={editForm.birthday}
                    onChange={handleChange}
                    name="birthday"
                  />
                </div>
                <div className="sur">
                  <label htmlFor="email">Email</label>
                  <input
                    className="mail-box"
                    type="email"
                    placeholder="ayomidefatogun@gmail.com"
                    value={editForm.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>

                <div className="sur">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    className="mail-box"
                    type="text"
                    placeholder="+234"
                    value={editForm.phone}
                    onChange={handleChange}
                    name="phone"
                  />
                </div>
                <div className="sur">
                  <label htmlFor="address">Address</label>
                  <input
                    className="mail-box"
                    type="text"
                    placeholder="address"
                    value={editForm.address}
                    onChange={handleChange}
                    name="address"
                  />
                </div>
                <div className="sur">
                  <label htmlFor="state">State</label>
                  <input
                    className="mail-box"
                    type="text"
                    placeholder="Lagos"
                    value={editForm.state}
                    onChange={handleChange}
                    name="state"
                  />
                </div>
                <div className="sur">
                  <label htmlFor="zipcode">Zip Code</label>
                  <input
                    className="mail-box"
                    type="text"
                    placeholder="104567"
                    value={editForm.zipcode}
                    onChange={handleChange}
                    name="zipcode"
                  />
                </div>
              </div>

              <Button type="submit">
                <BeatLoader
                  color="#fff"
                  loading={loading}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <p>Save Changes</p>
              </Button>
            </Form>
          </Pd>
          <Cardcontain>
            <img src={!picture ? avatar : picture} alt="avatar"
              sizes="20"
              style={{ width: "250px", height: "200px", alignSelf: "center" }}
            />
            <button id="ava">
              <Input1
                type="file"
                placeholder="Change Avater"
                onChange={fileUpload}
              />
            </button>
            <a href="" id="del">
              Delete
            </a>
          </Cardcontain>
        </div>
      </form>

    </Details>
  );
};

export default PersonalDetails;

const Input1 = styled.input`
  border-color: blue;
  font-size: 39px;
  width: 400px;
  height: 100px;
`

const Details = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  margin-right: 60px;

  .h2 {
    font-family: "Montserrat Alternates";
  }

  .cards{
    display: flex;
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


  .sur {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
  }

  input {
    font-size: 12px;
    font-weight: 250;
    line-height: 18px;
    letter-spacing: 0em;
    width: 100%;
    height: 40px;
    top: 20px;
    padding: 12px, 16px, 12px, 16px;
    gap: 10px;
    border: 1px solid rgb(199, 227, 240);

    @media screen and (max-width: 600px) {
      width: 100%;
      margin: auto;
    }
  }

  

  .label {
    font-family: "Montserrat";
    font-weight: 400px;
  }

  
`;


export const Button = styled.button`
background-color: #0000cd;
   text-decoration: none;
   color: white;
   border-radius: 16px;
   height: 40px;
   width: 450px;
   text-align: center;
   cursor: pointer;
   margin-top: 30px;
   gap: 8px;

   @media screen and (max-width: 600px) {
     width: 100%;
   }
`
const Pd = styled.div`
  left: 10px;
  margin-right: 20px;
  margin-top: 10px;
  width: 500px;
`;
const Form = styled.div`
  margin-bottom: 10px;
  gap: 10px;

  input{
    padding-left: 10px;
  }
`;
const Cardcontain = styled.div`
  display: flex;
  flex-direction: column;
 /* border: 1px solid #ccc; */
  /* border-radius: 5px; */
  overflow: hidden;
  cursor: pointer;
  height: 285px;
  width: 259px;
  margin-top: 30px;

  input{
    padding-top: 10px;
    padding-left: 55px;
  }

  @media screen and (max-width: 600px) {
    position: top;
  }


  .img {
    margin-top: 10px;
    width: 249%;
    height: 176px;
    object-fit: cover;
  }

  a {
    text-decoration: none;
    text-align: center;
    color: black;
    margin-top: 10px;
    cursor: pointer;
  }
  .input {
    display: flex;
    text-align: center;
    width: 100px;
  }
  #del {
    color: red;
  }
  #ava{
    margin-top: 10px;
    display: flex;
     flex-direction: column;
    align-items: center;
    top: 100%;
    width: 250px;
    margin-left: 5px;
    color: #060606;
    border-radius: 2px;

  }
`;
