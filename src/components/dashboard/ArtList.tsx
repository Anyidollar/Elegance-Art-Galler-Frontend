import { useContext, useState } from "react";
import { Art, ArtCard, AuctionCard, Card } from "./helper/Card";
import { useNavigate, useParams } from "react-router-dom";
import { ArtistSection, ContentSection, FeaturedSection } from "./helper/styles";
import { artists } from "./data/index";
import { ProductContext } from "../../Service/contextApi/ProductProvider";
import { toast } from "react-toastify";
import styled from "styled-components";

const ArtList = () => {
	const { products } = useContext(ProductContext);
	const { allAuctions } = useContext(ProductContext);
	const { name } = useParams();
	const [carts, setCarts] = useState<Art[]>(localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")!) : []);
	const navigate = useNavigate();

	console.log("Artlist", products);
	const allproducts = products.filter((p) => p.category === name);
	const auctionBycategory = allAuctions.filter((p) => p.artwork?.category === name);

	if (!products) {
		toast.error("Art not found");
	}

	if (!allAuctions) {
		toast.error("Auction not found");
	}

	const artworkOnSale = allproducts.filter((p: any) => p.artClass === "Sale");

	const getArtDetails = (artId: number) => {
		navigate(`/dashboard/detail/${artId}`);
	};

	const addToCartHandler = (artId: string) => {
		// if art is not in cart then add it
		if (carts.length > 0 && carts.find((p: Art) => p.id === artId)) {
			return toast.error("Art already in cart");
		}

		const art = products.find((p: any) => p.id === artId);

		// Using the callback form of setCarts to ensure i'm using the latest state
		setCarts((prevCarts) => {
			const updatedCarts = [...prevCarts, art];
			localStorage.setItem("carts", JSON.stringify(updatedCarts));
			toast.success("Art added to cart");
			return updatedCarts;
		});
	};

	return (
		<>
			<ContentSection>
				<Title>{name} Art on Sale</Title>
				{artworkOnSale.length === 0 && <p style={{ margin: "20px 0", textAlign: "center" }}>No record found</p>}
				<FeaturedSection>
					{artworkOnSale.map((art, index) => (
						<ArtCard key={index} data={art} showCart={true} viewDetail={() => getArtDetails(art.id)} addToCart={() => addToCartHandler(art.id)} />
					))}
				</FeaturedSection>
			</ContentSection>

			<ContentSection>
				<Title>Auctions</Title>
				{auctionBycategory.length === 0 && <p style={{ margin: "20px 0", textAlign: "center" }}>No record found</p>}{" "}
				<FeaturedSection>
					{auctionBycategory.map((art: any, index: any) => (
						<AuctionCard key={index} data={art} />
					))}
				</FeaturedSection>
			</ContentSection>

			<ContentSection>
				<Title>Popular Abstract Artists</Title>
				<ArtistSection>
					{artists.map((cat, index) => (
						<Card key={index} image={cat.img} title={cat.name} />
					))}
				</ArtistSection>
			</ContentSection>
		</>
	);
};

export default ArtList;

const Title = styled.h3`
	padding-bottom: 20px;
	font-weight: bolder;
`;
