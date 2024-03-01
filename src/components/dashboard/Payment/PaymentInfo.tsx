import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../../Service/contextApi/UserProvider";
// import { FlexIcon } from "./helper/styles";
import Modal from "../Modal";
import Logo from "../../../assets/logo.svg";
import Visa from "../../../assets/Visa.svg";
import { Art } from "../helper/Card";
import { useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { paystackVerify } from "../../../api/user";
import { toast } from "react-toastify";
import { usePaystackPayment } from 'react-paystack';

interface PaymentInfoProps {
  onNextButtonClick: () => void;
}

interface Config {
  reference: string;
  email:string 
  amount: number;
  publicKey: string;
}
const userEmail = localStorage.getItem('email')
const price = 20000
export const config:Config = {
  reference: (new Date()).getTime().toString(),
  email: userEmail as string,
  amount: price, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: 'pk_test_3974971c7fd41adb81112218be168a6ebd28fa05',
};



const PaymentInfo: React.FC<PaymentInfoProps> = ({ onNextButtonClick })  => {

  const initializePayment = usePaystackPayment(config);
  
  const loader = useSelector((state:any) => state.user.loading)
  const status = useSelector((state:any) => state.user.payStatus)
    
	const dispatch = useDispatch();
  const onSuccess = (reference:any) => {
    // Implementation for whatever you want to do with reference and after success call.
    const data = {...reference, userEmail, price}
    console.log(reference);
    try {
      paystackVerify(data, dispatch).then((res)=> {
        if(res.data.error){
            toast.error(res.data.error)
            console.log(res.data.error)
        }
        if(res.statusText == "OK" ){
            toast.success(res.data.message);
            localStorage.setItem('user', res.data.user)
            console.log(res)
        }   
    })
    } catch (error) {
      console.log(error)
    }
    
  };
  
  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

    const [card,setCard] = useState(Logo)
    const [cardDetails, setCardDetails] = useState({
        name: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      });

    const handleInputChange = (e:FormEventHandler<HTMLFormElement>) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
      };
    

    const handlepayment = ()=>{
      console.log("Waiting")
      initializePayment(onSuccess, onClose)
      .then((response) => {
        console.log("Payment initialization response:", response);
        // Handle the response as needed
      })
      .catch((error:any) => {
        console.error("Payment initialization error:", error);
        // Handle the error as needed
      });
    }
      
  return (
    <Main>
      <p
              style={{
                paddingLeft: "4px",
                color: "#101828",
                fontFamily: "Montserrat Alternates",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
              }}
            >
              Debit Cards
            </p>
            <Parent>
              <Container>
                <button
                  style={{
                    display:"flex",
                    padding: "5px",
                    width:"100%",
                    border:"none",
                    justifyContent:"space-between",
                    alignItems:"center"
                  }}
                >
                  <input
                    onClick={()=> setCard(Logo)}
                    type="radio"
                    id="myCheckbox"
                    name="myCheckbox"
                    value="someValue"
                  />
                  <img src={Logo} alt="" />
                  <h3>***123</h3>
                </button>
              </Container>
              <Container>
                <button
                  style={{
                    display: "flex",
                    padding: "5px",
                    width:"100%",
                    border:"none",
                    justifyContent:"space-between",
                    alignItems:"center"
                  }}
                >
                  <input
                    onClick={()=> setCard(Visa)}
                    type="radio"
                    id="myCheckbox"
                    name="myCheckbox"
                    value="someValue"
                  />
                  <img src={Visa} alt="" />
                  <h3>***4887</h3>
                </button>
              </Container>
            </Parent>
            <h3 style={{ fontFamily: "Montserrat Alternates" }}>Add new card</h3>
            <FormContainer>
              <Label
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  color: "01828",
                  fontWeight: 400,
                }}
              >
                Name on Card
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Ayomide Fatogun"
                value={cardDetails.name}
                onChange={handleInputChange}
                required
              />
              <Label
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Card Number
              </Label>
              <div style={{backgroundColor:"blue", position:"relative",marginBottom:"50px",display:"flex", flexDirection:"column"}}>
              
                <Input
                  style={{position:"absolute", paddingLeft:"40px"}}
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder={`4523 2341 9871 4887`}
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                  required
                />
                <img style={{ position:"absolute", marginTop:"8px", marginLeft:"5px"}} src={card} alt="" />
              </div>
              
              <Label
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Expiry Date
              </Label>
              <Input
                type="text"
                id="expiry"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleInputChange}
                placeholder="10/2025"
                required
              />
              <Label
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                CVV
              </Label>
              <Input
                type="text"
                id="cvv"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                placeholder="***"
                required
              />

              <Button onClick={handlepayment} type="submit">
              <BeatLoader
							color="white"
							loading={loader}
							size={20}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
                Next</Button>
            </FormContainer>
    </Main>
  )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* background-color:red; */
    width:100%;
    height:100%;
`;

const Parent = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  border-bottom: solid 1px gray;
`;

const Container = styled.div`
  width: 50%;
  padding: 5px;
  border: none;
  border-radius: 10px;
  display: flex;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 16px;
  background-color: #0000cd;
  color: #fff;
  cursor: pointer;
`;

const Label = styled.label`
  margin-bottom: 1px;
`;

const Input = styled.input`
  position: relative;
  width: 100%;
  height: 40px;
  padding: 6px;
  /* padding-top: 0px; */
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormContainer = styled.form`
  padding: 5px;
  padding-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: Montserrat Alternates;
`;

export default PaymentInfo

