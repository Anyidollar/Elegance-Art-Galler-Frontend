import React from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';
import styled  from 'styled-components';
import image from '../../assets/GalleryImages/Art6.jpeg';
import { Link } from 'react-router-dom';
import { orders } from './Order';
import { useParams } from "react-router";


const OrderDetail = () => {
    const { id } = useParams()
  return (
    <Main>
        <Link to={'/dashboard/order'}>
        <h1><HiArrowLongLeft/></h1>
        </Link>
        
      <First>
            <h2>Order details</h2>
            <Spanned>
                <Detail>Order No: <span>F711060151001</span></Detail>
                <Detail>Order Date: <span>12 June 2023</span></Detail>
                <Detail>Tracking ID: <span>F711060151001</span></Detail>
                <Detail>Delivery fee: <span>$2,000</span></Detail>
                <Detail>Total: <span>$15,000</span></Detail>
            </Spanned>      
      </First>
      <Second>
            <h2>Payment & Delivery details</h2>
            <Spanned>
                <Detail>Payment Method: <span>Debit Card</span></Detail>
                <Detail>Delivery Address: <span>32 Rasaq-Eletu Way Canal West Residences Osapa London Lekki Phase2</span></Detail>
                <Detail>Phone Number: <span>081234548661</span></Detail>
            </Spanned>
      </Second>
      <Third>
      <h2>Item details</h2>
      <ImgSpan>
      <div>
            <Img>
                <img src={image} alt="image" />
            </Img>
        </div>
        <Spanned>
            <h2>Spirit of Nigeria</h2>
            <div>
                <h4>Item Price:</h4>
                <p>$12,000</p>
            </div>
            <div>
                <h4>Artist:</h4>
                <p>Ben David</p>
            </div>
            <div>
                <h4>Quantity:</h4>
                <p>1</p>
            </div>
            <a href="#">Buy Again</a>
        </Spanned>
            
      </ImgSpan>
        
      </Third>
    </Main>
  )
}

export default OrderDetail


const Spanned = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: right;

    span{
        color: grey;
    }

    p{
        color: grey;
    }

    a{
        background-color: skyblue;
        text-decoration: none;
        color:blue;
        padding: 10px 5px;
        border-radius: 15px;
        font-size: 15px;
        text-align: center;
    }

    @media (max-width: 768px) {
		text-align: left;
	}
`;

const ImgSpan = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
		flex-direction: column;
	}
`;

const First = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    border-bottom: 3px solid grey;
    padding-bottom: 20px;

    span{
        font-weight: lighter;
    }
`;


const Second = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    border-bottom: 3px solid grey;
    padding-bottom: 20px;
    
`;

const Third = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;

    img{
        height: 200%;
        width: 200%;
        background-color: black;
    }
`;

const Img = styled.div`
    width: 130px;
    height: 50%;
`;
const Detail = styled.h3`
    display: flex;
    justify-content: space-between;
    span{
       text-align: right;
        font-weight: lighter ;
        width: 20%;
    }
    @media (max-width: 768px) {
        width: 100%;
        display: flex;
        gap: 10px;
        justify-content: flex-start;
        span{
            text-align: left;
            width: 40%;
        }
	}
`;

const Main = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
    gap: 20px;

    h1{
        font-size: 70px;
        color: black;
    }
    
`;