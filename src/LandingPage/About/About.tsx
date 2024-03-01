import React from 'react'
import { AboutUs, Auction, Direct, ArtWork, Text, AllText } from '../../App.styles';
import { RiAuctionFill } from 'react-icons/ri'
import { BiSolidShoppingBags } from 'react-icons/bi'
import { MdDeveloperBoard } from 'react-icons/md'

const About = () => {
  return (
    <>
      <AboutUs>
        <div className='ab'>
          <h1>About Us</h1>
        </div>
        <AllText>
          <Text>
            <Auction>
              <RiAuctionFill size={40} />
              <div id='auc-id'>
                <h4>Auction System</h4>
                <p>Artists can choose to list their <br />
                  artworks for auction, where <br />
                  users can engage in a<br />
                  competitive and exciting <br />
                  bidding process for the <br />
                  artworks they desire.</p>
              </div>
            </Auction>
            <Direct>
              <BiSolidShoppingBags size={40} />
              <div id='dir-id'>
                <h4>Direct Purchase</h4>
                <p>Users can purchase artworks <br />
                  directly at a fixed price set by <br />
                  the artist, with secure payment <br />
                  options integrated for hassle- <br />
                  free transactions.</p>
              </div>
            </Direct>
            <ArtWork>
              <MdDeveloperBoard size={40} />
              <div id='art-id'>
                <h4>Artwork Catalog</h4>
                <p>Explore a comprehensive <br />
                  catalog of artworks, offering <br />
                  sorting by categories, styles, <br />
                  and artists, with search and <br />
                  filter options for easy <br />
                  navigation and discovery.</p>
              </div>
            </ArtWork>
          </Text>
          <button>Contact Us</button>
        </AllText>
      </AboutUs>
    </>
  )
}

export default About