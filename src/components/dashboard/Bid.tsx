import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { loveIcon, marisPic, arrowLeft } from "../../assets/dashboard";
import artist1 from "../../assets/dashboard/pics/artist1.png";
import { numberWithCommas } from "./utils";
import { Link, useParams } from "react-router-dom";
import { ProfileAvatar, FlexIcon } from "./helper/styles";
import BidForm from "./BidForm";
import { ProductContext } from "../../Service/contextApi/ProductProvider";
import { toast } from "react-toastify";
import axios from "../../Service/axios";
import { useSelector } from "react-redux";


const Bid = () => {
  const { productId } = useParams();
  const [bids, setBids] = useState([]) as any
  const bidUser = useSelector((state) => state.user.bids);
  console.log(bidUser)
  // console.log("bid live", liveArtwork);
  // console.log("bid id", productId);
  const [artId, setArtId] = useState("")
  const { liveArtwork } = useContext(ProductContext);

  const data = liveArtwork.find((p) => p.id === productId);
  console.log(data, "message");
  const runner = () => {
    axios
        .get(`http://localhost:5000/artwork/list-bids/${artId}`)
        .then((res) =>{
          console.log("Finally...", res.data);
          // Handle the response as needed
        })
  }
  if (!data) {
    toast.error("Artwork not found");
  }
  console.log(data?.artworkId)
  useEffect(()=>{
    setBids(bidUser.bids)
    runner()
    setArtId(data?.artworkId)
    console.log(data?.artworkId)
    // const response = axios
    //     .get(`http://localhost:5000/artwork/list-bids/${productId}`)
    //     .then((res)=>{
    //       console.log("response data", res.data);
    //       // Handle the response as needed
    //       setUser(res.data)
    //     })
    //     console.log(response)

  },[productId])
  return (
    <div>
      <Link to="/dashboard/auction">
        <img
          src={arrowLeft}
          alt=""
          style={{ margin: "10px 20px", cursor: "pointer" }}
        />
      </Link>
      <DetailContainer>
        <DetailInfo>
          <img src={data?.artwork?.imageUrl} alt="" />
          <BidForm price={ 10000} auctionId={data?.id || ""} />
        </DetailInfo>
        <DetailInfo>
          <FlexIcon>
            <img src={loveIcon} alt="Love icon" />
            <span>{data?.likes || 0}</span>
          </FlexIcon>
          <h3>{data?.artwork?.artName || ""}</h3>
          <p>{data?.artwork?.description || ""}</p>
          <Table>
            <tr>
              <TableHeader>Artist</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Category</TableHeader>
            </tr>
            <tr>
              <td style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <ProfileAvatar src={marisPic} alt="Profile" />
                <span>{data?.artwork?.artist?.firstname}</span>
              </td>
              <td>{data?.artwork?.artist?.address || ""}</td>
              <td>{data?.artwork?.category || ""}</td>
            </tr>
          </Table>
          <div>
            <h3 style={{ color: "#888888" }}>Bids</h3>
            <BidsDiv>
              {bids && bids.map((item) => (

              <EachBid key={item.id}>
                <ProfileAvatar src={item.user.profilePic || marisPic} alt="Profile" />
                <div
                  style={{ display: "flex", alignItems: "end", gap: "20px", width:"100%", padding:"5px" }}
                >
                  <span style={{ color: "#888888" }}>
                    Total <br /> by
                  </span>
                  <span>
                    N{numberWithCommas(item.price)} <br /> {item.user.firstname +" "+ item.user.surname}
                  </span>
                  <span style={{ color: "#888888" }}>{new Date(item.bidTime).toLocaleDateString("en-GB")}</span>
                </div>
              </EachBid>
              ))}
            </BidsDiv>
          </div>
        </DetailInfo>
      </DetailContainer>
    </div>
  );
};

export default Bid;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 180%;
  }
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* flex: 1; */
  width: 50%;

  p {
    color: #4f4f4f;
  }
`;

const Table = styled.table`
  margin: 20px 0;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 5px 0;
  color: #888888;
`;

const BidsDiv = styled.div`
  margin: 20px 0;
`;

const EachBid = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  align-items: center;
  text-align: center;
  border-bottom: solid 1px gray;
`;
