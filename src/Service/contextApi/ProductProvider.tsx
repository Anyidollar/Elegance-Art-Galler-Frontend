import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "../axios";

interface IProduct {
  artwork: any;
  id: number;
  name: string;
  price: number;
  likes: number;
  address: string;
  artist: string;
  img: string;
  auctionDate: string;
  time: string;
  category: string;
}

interface ProductContextProps {
	products: IProduct[];
	liveArtwork: IProduct[];
	allAuctions: IProduct[];
	artworksByArtist: IProduct[];

}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [liveArtwork, setLiveArtwork] = useState<IProduct[]>([]);
	const [allAuctions, setAllAuctions] = useState<IProduct[]>([]);
	const [artworksByArtist, setArtworksByArtist] = useState<IProduct[]>([]);
	const [bidPrice, setBidPrice] = useState(0);

	useEffect(() => {
		const fetchArtworks = async () => {
			try {
				const response = await axios.get("/art/getAll");
				const data = await response.data.data;
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		const fetchLiveArtworks = async () => {
			try {
				const response = await axios.get("/artwork/ongoing-auctions");
				const data = await response.data.data;
				// console.log("live Auction", data);
				setLiveArtwork(data);
			} catch (error) {
				console.error("Error fetching Live Auctions:", error);
			}
		};

		const fetchAllAuctions = async () => {
			try {
				const response = await axios.get("/auction/get-auctions");
				const data = await response.data.allAuctions.rows;
				// console.log("All Auction", data);
				setAllAuctions(data);
			} catch (error) {
				console.error("Error fetching Live Auctions:", error);
			}
		};

		const fetchAllArtworksByArtist = async () => {
			try {
				const response = await axios.get("/art/artist-artworks");
				const data = await response.data.data;
				// console.log("artworks by artist", data);
				setArtworksByArtist(data);
			} catch (error) {
				console.error("Error fetching artworks by artist:", error);
			}
		};

		fetchArtworks();
		fetchLiveArtworks();
		fetchAllAuctions();
		fetchAllArtworksByArtist();
	}, []);

	return <ProductContext.Provider value={{ products, liveArtwork, allAuctions, artworksByArtist, bidPrice, setBidPrice }}>{children}</ProductContext.Provider>;
};

export { ProductContext, ProductProvider };
