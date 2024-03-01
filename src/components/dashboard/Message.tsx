import React, { useState, useEffect } from "react";
import axios from "axios";
import { marisPic } from "../../assets/dashboard";
import styled from "styled-components";
import Square from "../../assets/square.png";
import Search from "../../assets/search.svg";

const MessageNotificationCard = () => {
  const username = localStorage.getItem("username");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/users/get-notifications"
      );
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <Container>
        <Content1>
            <div>
              <Header style={{ fontFamily: "Montserrat Alternates" }}>
                Message
              </Header>
            </div>

            <div style={{ display: "flex", gap:"20px", justifyContent: "end" }}>
              <h1 style={{ marginTop: "-15px", height: "24px" }}>...</h1>
              <img
                src={Square}
                alt=""
                style={{
                  width: "24px",
                  height: "24px",
                  margin: "5px",
                  color: "#aaa",
                }}
              />
            </div>
        </Content1>

        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            style={{
              paddingLeft: "30px",
              width: "100%",
            }}
          />
          <img
            src={Search}
            alt=""
            style={{
              width: "26px",
              height: "24px",
              position: "absolute",
              margin: "5px",
            }}
          />
        </SearchForm>
        {notifications.map((notification, index) => (
          <Card key={index}>
            <Content>
              <Avatar src={marisPic} alt="Profile" />
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Name>{username}</Name>
                  <time>
                    {new Date(notification.createdAt).toLocaleString()}
                  </time>
                </div>
                <MessageText style={{ textAlign: "left" }}>
                  {notification.message}
                </MessageText>
              </div>
            </Content>
          </Card>
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  border-right: 1.5px solid var(--Grey-300, #d0d5dd);
  background: var(--White, #fff);
  width: 50%;
  height: auto;
  margin-top: 20px;
  padding: 20px;

  @media screen and (max-width: 768px){
    width: 100%;
  }
`;

const SearchBtn = styled.img`
  
`;

const Card = styled.div`
  text-align: center;
  font-family: "Montserrat";
  width: 100%;
  height: auto;
  max-width: 550px;
  margin-top: 40px;
  padding-bottom: 16px;
  border-bottom: solid 1px #f2f4f7;
  margin-bottom: 29px;
`;

const Header = styled.h1`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Content1 = styled.div`
  display: flex;
  gap: 10px;
  //width: 50%;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #f2f4f7;
  margin-bottom: 29px;
`;

const Content = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  border-left: solid 6px blue;
`;

const SearchForm = styled.form`
  display: flex;
  padding: 15px 0;
  margin-bottom: 15px;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  border: none;
  width: 47%;
  padding: 16px 4px;
  align-items: center;
  gap: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.718);
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Name = styled.h3`
  margin: 0;
`;

const MessageText = styled.p`
  text-align: left;
`;

export default MessageNotificationCard;
