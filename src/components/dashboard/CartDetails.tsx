
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { timeIcon, loveIcon, marisPic, arrowLeft } from "../../assets/dashboard";
import { Link } from "react-router-dom";
import { ProfileAvatar, FlexIcon } from "./helper/styles";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { formatDate } from "./utils";
import { Art } from "./helper/Card";
// import { userEmail, config } from "./Payment/PaymentInfo";
import { useDispatch, useSelector } from "react-redux";
import { paystackVerify } from "../../api/user";
import { toast } from "react-toastify";
import { usePaystackPayment } from 'react-paystack';

const CartDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [miniPrice, setMiniPrice] = useState(0) 
    
    interface Config {
        reference: string;
        email:string 
        amount: number;
        publicKey: string;
        }
    const userEmail = localStorage.getItem('email')
    const config:Config = {
        reference: (new Date()).getTime().toString(),
        email: userEmail,
        amount: miniPrice, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_3974971c7fd41adb81112218be168a6ebd28fa05',
    };
    


    const initializePayment = usePaystackPayment(config);
  
    // const loader = useSelector((state) => state.user.loading)
    // const status = useSelector((state:any) => state.user.payStatus)
    // const { products } = useContext(ProductContext);
    const { cartId } = useParams();

    const [carts, setCarts] = React.useState<Art[]>([]);

    useEffect(() => {
        const carts = localStorage.getItem("carts");
        if (carts) {
            setCarts(JSON.parse(carts));
        }
    }, []);

    const product = carts.find((p) => p.id === cartId);
     console.log(product)
    if (!product) {
        return <p>Product not found</p>;
    }

    const { id, artName, price, likes, address, artist, imageUrl, bidTime, time, category, description } = product;
    const artWork = (artId: any) => {
        setMiniPrice(price)
        console.log(miniPrice)
        handlepayment()
        navigate(`/dashboard/payment-info/${artId}`)
    }
    console.log(artWork)

    // const handleInputChange = (e:FormEventHandler<HTMLFormElement>) => {
    //     const { name, value } = e.target;
    //     setCardDetails({ ...cardDetails, [name]: value });
    //   };
    // interface Config {
    //     reference: string;
    //     email:string 
    //     amount: number;
    //     publicKey: string;
    //   }
    //   const userEmail = localStorage.getItem('email')
    //   const config:Config = {
    //     reference: (new Date()).getTime().toString(),
    //     email: userEmail as string,
    //     amount: price, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    //     publicKey: 'pk_test_3974971c7fd41adb81112218be168a6ebd28fa05',
    //   };

   
      
     

    const onSuccess = (reference) => {
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
                navigate(`/dashboard/payment-info/${id}`)
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
        <div>
            <Link to="/dashboard/wishlist">
                <img src={arrowLeft} alt="" style={{ margin: "10px 20px", cursor: "pointer" }} />
            </Link>
            <DetailContainer>
                
                <DetailInfo>
                    {/* <div> */}
                      <h3>Popular Art</h3>
                       <img src={imageUrl} alt="" id="photo"/>
                      <h4>{artName}</h4>
                    {/* </div> */}

                    <FlexIcon>
                        <img src={timeIcon} alt="Time icon" />
                        <span>{formatDate(price)}</span>
                    </FlexIcon>
                    <button onClick={() => artWork(id)}>Buy</button>
                </DetailInfo>
                
                
                <DetailInfo>
                    <FlexIcon>
                        <img src={loveIcon} alt="Love icon" />
                        <span>{likes || 0}</span>
                    </FlexIcon>
                    <ProfileAvatar src={marisPic} alt="Profile" />
                    <h3>{artist.firstname}</h3>
                    <h4>Artist</h4>
                    <div>
                    <p>
                        {description}
                    </p>
                    </div>
                    <table>
                        <tr>
                            <TableHeader>Location</TableHeader>
                            <TableHeader>Specialized in</TableHeader>
                        </tr>
                        <tr>
                            <td>{address || ""}</td>
                            <td>{category || ""}</td>
                        </tr>
                    </table>
                    <div>
                        <h3>More Art</h3>
                        {/* <div></div> */}
                    </div>
                </DetailInfo>
                
            </DetailContainer>
        </div>
    );
};

export default CartDetails;

const DetailContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px;
	gap: 30px;

    /* display: flex;
 flex-direction: column;
 align-items: center;
 margin: 0 auto;
 width: 80%;
 height: 80vh; */

 @media screen and (max-width: 768px) {
    width: 90%;
 }

`;

const DetailInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	flex: 1;
    width: 0px;

    /* display: flex;
 justify-content: space-between;
 width: 100%;
 padding: 1rem;
 border-bottom: 1px solid #ddd; */
    button{
        background-color: blue;
        color: white;
        width: Fill (500px);
        height: 46px;
        padding: 13px, 50px;
        border-radius: 16px;
       border: 2px;
       gap: 10px;

    }
    @media (max-width: 768px) {
        /* display: flex; */
		/* flex-direction: column; */
        /* #photo{
            height: 100px;
            width: 500%;
        } */
	}

`;

const TableHeader = styled.th`
	text-align: left;
	padding: 5px 0;
`;
