import React, { useState } from "react";
import styled from "styled-components";
import Success from "../../assets/success.svg"


const Modal = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    document.body.classList.toggle("active-modal");
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        <div style={{padding:"10px", borderRadius:"6px"}}>
        Next
        </div>
        
      </button>

      <StyledModal modal={modal}>
        <div onClick={toggleModal} className="overlay"></div>
        <ModalContent>
            <img src={Success} style={{height: '80px'}} alt="" /> 
          <h2>SUCCESS!</h2>
          <p>Congratulations on your successful art purchase.</p>
          <h6>kindly check your email for confirmation</h6>
          <div>
            <button>Next</button>
          </div>
          <CloseButton onClick={toggleModal}>CLOSE</CloseButton>
        </ModalContent>
      </StyledModal>
    </>
  );
};
const StyledModal = styled.div`
  display: flex;
  width: 100vw;
  height: 130vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(49, 49, 49, 0.8);
  display: ${props => (props.modal ? "block" : "none")};

  
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
  padding: 70px 28px;
  border-radius: 20px;
  max-width: 600px;
  min-width: 300px;
  font-family: Montserrat;
  h2 {
    margin-bottom: 20px;
    color: var(--primary-royal-blue, #0000CD);
    text-align: center;
    font-family: Montserrat;
    font-size: 26.892px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  img{
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  h6{
    justify-content: center;
    text-align:center;
  }
  button{
    margin-top: 20px;
    margin-left: 120px;
    /* display: flex; */
    align-items: center;
    text-align: center;
    background-color: blue;
    color: white;
    width: 160px;
    height: 30px;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    

  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;

`;

export default Modal;
