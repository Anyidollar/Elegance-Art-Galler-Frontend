import React, { useState, useContext } from "react";
import { ContentSection, FeaturedSection } from "./helper/styles";
import { Art, LiveAuctionCard } from "./helper/Card";
import { time } from "../../assets/dashboard";
import { timeDiff } from "./utils";
import { ProductContext } from "../../Service/contextApi/ProductProvider";
import { useNavigate } from "react-router-dom";

const Auction = () => {
  const { liveArtwork } = useContext(ProductContext);
  const navigate = useNavigate();

  console.log(liveArtwork);

  const bidArtwork = (artId: number) => {
    navigate(`/dashboard/bid/${artId}`);
  };

  return (
    <>
      <ContentSection>
        <h3>Live Auction</h3>
        <FeaturedSection>
          {liveArtwork.map((artwork: Art, index: number) => (
            <LiveAuctionCard
              key={index}
              data={artwork}
              whichBid="Last Bid"
              textColor="red"
              icon={time}
              time={timeDiff(artwork.bidTime)}
              onClick={() => bidArtwork(artwork.id)}
            />
          ))}
        </FeaturedSection>
      </ContentSection>
    </>
  );
};

export default Auction;
