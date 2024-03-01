import styled from "styled-components";
import {
  timeIcon,
  loveIcon,
  marisPic,
  arrowLeft,
} from "../../assets/dashboard";
import { Link } from "react-router-dom";
import { ProfileAvatar, FlexIcon } from "./helper/styles";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../Service/contextApi/ProductProvider";
import { formatDate } from "./utils";

const Detail = () => {
  const { products } = useContext(ProductContext);
  useContext(ProductContext);

  const { productId } = useParams();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <p>Artwork not found</p>;
  }

  const {
    artName,
    price,
    likes,
    artist,
    description,
    imageUrl,
    category,
    createdAt,
  } = product;
  const { firstname, surname, address } = artist;

  return (
    <div>
      <Link to="/dashboard">
        <img
          src={arrowLeft}
          alt=""
          style={{ margin: "10px 20px", cursor: "pointer" }}
        />
      </Link>
      <DetailContainer>
        <DetailInfo>
          <h3>Popular Art</h3>
          <img src={imageUrl} alt="" />
          <h4>{artName}</h4>

          <FlexIcon>
            <img src={timeIcon} alt="Time icon" />
            <span>{formatDate(createdAt)}</span>
          </FlexIcon>
        </DetailInfo>
        <DetailInfo>
          <FlexIcon>
            <img src={loveIcon} alt="Love icon" />
            <span>{likes ? likes : 30}</span>
          </FlexIcon>
          <ProfileAvatar src={marisPic} alt="Profile" />
          <h3>{`${firstname} ${surname}`}</h3>
          <h4>Artist</h4>
          <p>{description}</p>
          <table>
            <tr>
              <TableHeader>Location</TableHeader>
              <TableHeader>Specialized in</TableHeader>
            </tr>
            <tr>
              <td>{address ? address : "Lagos"}</td>
              <td>{category}</td>
            </tr>
          </table>
          <div>
            <h3>More Art</h3>
          </div>
        </DetailInfo>
      </DetailContainer>
    </div>
  );
};

export default Detail;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* flex: 1; */
  width: 50%;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 5px 0;
`;
