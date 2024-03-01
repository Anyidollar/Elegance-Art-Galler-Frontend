import React from 'react';
import styled from 'styled-components';
import image from '../../assets/GalleryImages/Art5.jpeg';
import image1 from '../../assets/GalleryImages/Art6.jpeg';
import image2 from '../../assets/GalleryImages/Art7.jpeg';
import { Link, useParams } from "react-router-dom";
import OrderDetail from './OrderDetail';


export const orders = [
    {id:"F711060151002",image:`${image2}`, method:"Debit Card", price:"12,000", date:"19 June 2023",address:"Rasaq-Eletu" },
    {id:"F711060151001",image:`${image1}`, method:"Debit Card", price:"1,000", date:"12 June 2023",address:"Edo-Tech Park" },
    {id:"F711060151000",image:`${image}`, method:"Debit Card", price:"20,000", date:"1 June 2023",address:"Edo-Tech Park" }
]

const Orders = () => {
  return (
    <>

    
        <Main>
        {orders && orders.map((order) => (
            <MainDiv key={order.id}>
            <Left>
                <Img>
                <img src={order.image} alt="image" />
                </Img>
                
                <h4>Total: ${order.price}</h4>
                <h4>Order: <span>{order.date}</span> </h4>
                <h4>Payment Method: <span>{order.method}</span></h4>
            </Left>

            <Right>
				<a href="/dashboard/orderDetail/">View Details</a>
                
                <div>
                    <h4>Order Date:</h4>
                    <p>{order.date}</p>
                </div>
                <div>
                    <h4>Delivery Address:</h4>
                    <p>{order.address} </p>
                </div>
            </Right>
        </MainDiv>
        ))}
        
        </Main>
    </>
    
  )
}



const Img = styled.div`
    width: 150px;
    height: 60%;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 5px;
   
`;

const Border = styled.div`
    border-bottom: 2px solid grey;
    background-color: #4f9cde;
    height: 12px;
`;

const MainDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30%;
    margin: 5px 0px;
    padding: 15px 0px;
    border-bottom: 1px solid grey;
   

    a{
        background-color: skyblue;
        text-decoration: none;
        color: blue;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: small;
        font-weight: bold;
        text-align: center;
    }
    img{
        height: 100%;
        width: 100%;
    }
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: right;

    p{
        color: grey;
    }
    
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    span{
        color: grey;
    }
`;

export default Orders

