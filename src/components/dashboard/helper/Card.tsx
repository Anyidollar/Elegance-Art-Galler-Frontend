import styled from "styled-components";
import { marisPic, location, loveIconWhite, timeIcon } from "../../../assets/dashboard";
import { FlexIcon } from "./styles";
import { dateDiff, formatDate, formatDateByYear, numberWithCommas } from "../utils";
import { TbCurrencyNaira } from "react-icons/tb";
import { calendar } from "../../../assets/dashboard/index";

export type Art = {
	id: string;
	artName: string;
	price: number;
	likes: number;
	address: string;
	artist: string;
	imageUrl: string;
	icon?: string;
	bidTime: string;
	time: string;
	category: string;
	description: string;
	artistID: string;
	soldOut: boolean;
	artClass: string;
	auction_status: string;
};

export interface IAuction {
	id: number;
	artName: string;
	startingPrice: number;
	currentPrice: number;
	startDate: string;
	endDate: string;
	bidders: string[];
	artwork: Art;
	status: string;
}

type Props = {
	image: string;
	title: string;
	onClick?: () => void;
};

type CardProps = {
	data: Art[];
	viewDetail?: () => void;
	whichBid?: string;
	textColor?: string;
	time?: string;
	addToCart?: () => void;
	showCart?: boolean;
	onClick?: () => void;
	icon: string;
};

type AProps = {
	data: IAuction[];
	viewDetail?: () => void;
	whichBid?: string;
	textColor?: string;
	time?: string;
	addToCart?: () => void;
};

export const Card = ({ image, title, onClick }: Props) => {
	return (
		<CardContainer onClick={onClick}>
			<CardImage src={image} alt="Card" />
			<CardTitle>{title}</CardTitle>
		</CardContainer>
	);
};

export const ArtCard = ({ data, viewDetail, textColor, addToCart, showCart }: CardProps) => {
	const { artName, price, imageUrl, artist, likes, artClass, createdAt } = data;
	const { address, firstname } = artist;

	const Price = styled.span`
		font-family: "Montserrat";
		font-size: 24px;
		font-weight: 500;
		color: ${(props) => textColor || "#101828"};

		@media (max-width: 768px) {
			font-size: 18px;
		}
	`;
	return (
		<ArtCardContainer>
			<CardImage src={imageUrl} alt="Card" />
			<div onClick={viewDetail} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: "10px" }}>
				<CardName>{artName}</CardName>
				<ArtistInfo>
					{showCart && (
						<FlexIcon>
							<Avatar src={marisPic} alt="Profile" />
							<span>{firstname}</span>
						</FlexIcon>
					)}
					{showCart ? (
						<FlexIcon>
							<img src={location} alt="Profile" />
							<span>{address ? address : "Lagos"}</span>
						</FlexIcon>
					) : (
						<FlexIcon>
							<img src={timeIcon} alt="Time icon" />
							<span>{formatDateByYear(createdAt)}</span>
						</FlexIcon>
					)}
				</ArtistInfo>
				<FlexIcon>
					<PriceLabel>Price</PriceLabel>
					<span>
						<TbCurrencyNaira />
						<Price>{numberWithCommas(price)}</Price>
					</span>
				</FlexIcon>
			</div>
			<TimeDiv>{showCart && <CartBtn onClick={addToCart}>Add to Cart</CartBtn>}</TimeDiv>
			<TimeDiv>{!showCart && artClass}</TimeDiv>
			<LikeDiv>
				<img src={loveIconWhite} alt="Profile" style={{ color: "white" }} />
				<span>{likes}</span>
			</LikeDiv>
		</ArtCardContainer>
	);
};

export const UpcomingAuctionCard = ({ data, onClick, whichBid, textColor, icon, time }: CardProps) => {
	const { artName, price, imageUrl, artist, likes } = data;
	const { address, firstname } = artist;

	const Price = styled.span`
		font-family: "Montserrat";
		font-size: 24px;
		font-weight: 500;
		color: ${(props) => textColor || "#101828"};

		@media (max-width: 768px) {
			font-size: 18px;
		}
	`;
	return (
		<ArtCardContainer onClick={onClick}>
			<CardImage src={imageUrl} alt="Card" />
			<div onClick={onClick} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: "10px" }}>
				<CardName>{artName}</CardName>
				<ArtistInfo>
					<FlexIcon>
						<Avatar src={marisPic} alt="Profile" />
						<span>{firstname}</span>
					</FlexIcon>

					<FlexIcon>
						<img src={location} alt="Profile" />
						<span>{address}</span>
					</FlexIcon>
				</ArtistInfo>
				<FlexIcon>
					<PriceLabel>{whichBid}</PriceLabel>
					<span>
						<TbCurrencyNaira style={{ color: `${textColor}` }} />
						<Price>{numberWithCommas(price)}</Price>
					</span>
				</FlexIcon>
			</div>

			<TimeDiv>
				<img src={icon} alt="Profile" style={{ color: "white" }} />
				<span>{time}</span>
			</TimeDiv>
			<LikeDiv>
				<img src={loveIconWhite} alt="Profile" style={{ color: "white" }} />
				<span>{likes}</span>
			</LikeDiv>
		</ArtCardContainer>
	);
};

export const AuctionCard = ({ data, viewDetail }: AProps) => {
	const { startingPrice, startDate, artwork } = data;
	const { artName, price, imageUrl, artist, likes } = artwork;
	console.log(artist)
	const { address, firstname } = artist;

	const Price = styled.span`
		font-family: "Montserrat";
		font-size: 24px;
		font-weight: 500;
		color: "#101828";

		@media (max-width: 768px) {
			font-size: 18px;
		}
	`;
	return (
		<ArtCardContainer>
			<CardImage src={imageUrl} alt="Card" />
			<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
				<CardName>{artName}</CardName>
				<ArtistInfo>
					<FlexIcon>
						<Avatar src={marisPic} alt="Profile" />
						<span>{firstname}</span>
					</FlexIcon>

					<FlexIcon>
						<img src={location} alt="Profile" />
						<span>{address ? address : "Lagos"}</span>
					</FlexIcon>
				</ArtistInfo>
				<FlexIcon>
					<PriceLabel>Starting bid</PriceLabel>
					<span>
						<TbCurrencyNaira />
						<Price>{numberWithCommas(startingPrice)}</Price>
					</span>
				</FlexIcon>
			</div>

			<TimeDiv>
				<img src={calendar} alt="Profile" style={{ color: "white" }} />
				<span>{formatDate(startDate)}</span> - <span>{formatDate(endDate)}</span>
			</TimeDiv>
			<LikeDiv>
				<img src={loveIconWhite} alt="Profile" style={{ color: "white" }} />
				<span>{likes}</span>
			</LikeDiv>
		</ArtCardContainer>
	);
};

export const LiveAuctionCard = ({ data, onClick, whichBid, textColor, icon, time }: AProps) => {
	const { startingPrice, currentPrice, startDate, endDate, bidders, artwork } = data;
	const { artName, price, imageUrl, artist, likes } = artwork;
	const { address, firstname, surname } = artist;

	const timeLeft = dateDiff(startDate, endDate);

	const Price = styled.span`
		font-family: "Montserrat";
		font-size: 24px;
		font-weight: 500;
		color: ${(props) => textColor || "#101828"};

		@media (max-width: 768px) {
			font-size: 18px;
		}
	`;
	return (
		<ArtCardContainer onClick={onClick}>
			<CardImage src={imageUrl} alt="Card" />
			<div onClick={onClick} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: "10px" }}>
				<CardName>{artName}</CardName>
				<ArtistInfo>
					<FlexIcon>
						<Avatar src={marisPic} alt="Profile" />
						<span>{`${firstname} ${surname}`}</span>
					</FlexIcon>

					<FlexIcon>
						<img src={location} alt="Profile" />
						{/* <span>{address}</span> */}
						<span>Lagos</span>
					</FlexIcon>
				</ArtistInfo>
				<FlexIcon>
					<PriceLabel>{whichBid}</PriceLabel>
					<span>
						<TbCurrencyNaira style={{ color: `${textColor}` }} />
						<Price>{numberWithCommas(currentPrice)}</Price>
					</span>
				</FlexIcon>
			</div>

			<TimeDiv>
				<img src={icon} alt="Profile" style={{ color: "white" }} />
				<span>{timeLeft}</span>
			</TimeDiv>
			<LikeDiv>
				<img src={loveIconWhite} alt="Profile" style={{ color: "white" }} />
				<span>{likes}</span>
			</LikeDiv>
		</ArtCardContainer>
	);
};

export const CartCard = ({ data, textColor, onClick }: CardProps) => {
	const { artName, price, imageUrl, artist, likes } = data;
	const { address, firstname, surname } = artist;
	const Price = styled.span`
		font-family: "Montserrat";
		font-size: 24px;
		font-weight: 500;
		color: ${(props) => textColor || "#101828"};

		@media (max-width: 768px) {
			font-size: 18px;
		}
	`;
	return (
		<ArtCardContainer>
			<CardImage src={imageUrl} alt="Card" onClick={onClick} />
			<div style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: "10px" }}>
				<CardName>{artName}</CardName>
				<ArtistInfo>
					<FlexIcon>
						<Avatar src={marisPic} alt="Profile" />
						<span>{`${firstname} ${surname}`}</span>
					</FlexIcon>

					<FlexIcon>
						<img src={location} alt="Profile" />
						<span>{address ? address : "Lagos"}</span>
					</FlexIcon>
				</ArtistInfo>
				<FlexIcon>
					<PriceLabel>Price</PriceLabel>
					<span>
						<TbCurrencyNaira />
						<Price>{numberWithCommas(price)}</Price>
					</span>
				</FlexIcon>
			</div>
		</ArtCardContainer>
	);
};

const CardContainer = styled.div`
	/* width: 200px; */
	border: 1px solid #ccc;
	border-radius: 5px;
	overflow: hidden;
	cursor: pointer;
`;

const CardImage = styled.img`
	width: 100%;
	height: 150px;
	object-fit: cover;
`;

const CardTitle = styled.h3`
	padding: 10px;
	text-align: center;
	font-size: 14px;
`;

// Art Card Styles

const ArtCardContainer = styled.div`
	border-radius: 10px;
	overflow: hidden;
	/* cursor: pointer; */
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Avatar = styled.img`
	width: 15px;
	height: 15px;
	border-radius: 50%;
`;

const CardName = styled.h3`
	font-size: 18px;
	font-weight: 700;
	color: #101828;

	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

const ArtistInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 16px;
	font-weight: 400;
	color: #101828;
	font-family: "Montserrat";
	cursor: pointer;

	@media (max-width: 768px) {
		font-size: 10px;
	}
`;

const LikeDiv = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	position: absolute;
	top: 10px;
	right: 10px;
	color: #fff;
	background-color: rgba(255, 255, 255, 0.16);
	padding: 2px 4px 2px 4px;
	border-radius: 6px;
	font-size: 12px;
	cursor: pointer;
`;

const TimeDiv = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	position: absolute;
	top: 10px;
	left: 10px;
	color: #fff;
	//background-color: rgba(0, 0, 0, 0.8);
	background-color: green;
	padding: 2px 4px 2px 4px;
	border-radius: 6px;
	font-size: 12px;
`;

const PriceLabel = styled.span`
	font-family: "Montserrat Alternates";
	color: #888888;

	@media (max-width: 768px) {
		font-size: 10px;
	}
`;

const CartBtn = styled.button`
	background-color: #fff;
	border: 1px solid #101828;
	border-radius: 5px;
	padding: 5px;
	font-size: 12px;
	font-weight: 500;
	color: #101828;
	cursor: pointer;
`;
