import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Auction, Wishlist, Order, Message, Setting, SidebarSection, Main, Nav, OrderDetail } from "./index";
import { useUserContext } from "../../Service/contextApi/UserProvider";
import Category from "./Category";
import Payment from "./Payment/Index";
import Detail from "./Detail";
import ArtList from "./ArtList";
import Bid from "./Bid";
import Showroom from "./Showroom";
import UploadArtwork from "./UploadArtwork";
import PaymentModal from "./Payment/Index";
import CartDetails from "./CartDetails";
import Index from "../dashboard/Payment/Index";
import Modal from "./Modal";

const AdminDashboard = () => {
	const { showDrawer } = useUserContext();

	return (
		<DashboardContainer>
			<Nav />
			<ContentContainer>
				<Sidebar showDrawer={showDrawer}>
					<SidebarSection />
				</Sidebar>
				<MainContent>
					<Routes>
						<Route index element={<Main />} />
						<Route path="main" element={<Main />} />
						<Route path="auction" element={<Auction />} />
						<Route path="payment" element={<Payment />} />
						<Route path="wishlist" element={<Wishlist />} />
						<Route path="order" element={<Order />} />
						<Route path="message" element={<Message />} />
						<Route path="setting" element={<Setting />} />
						<Route path="orderDetail" element={<OrderDetail />} />
						<Route path="arts" element={<Category />} />
						<Route path="detail/:productId" element={<Detail />} />
						<Route path="artList/:name" element={<ArtList />} />
						<Route path="bid/:productId" element={<Bid />} />
						<Route path="paymentModal" element={<PaymentModal />} />
						<Route path="cart-detail/:cartId" element={<CartDetails />} />
						<Route path="payment-info/:atId" element={<Index />} />
						<Route path="/delivery/:artId/add-address" element={<Modal />} />
						<Route path="showroom" element={<Showroom />} />
						<Route path="showroom/upload" element={<UploadArtwork />} />
					</Routes>
				</MainContent>
			</ContentContainer>
		</DashboardContainer>
	);
};

export default AdminDashboard;

const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	font-family: "Montserrat";
`;

const ContentContainer = styled.div`
	display: flex;
	margin-top: 60px;
	height: calc(100vh - 60px);
	overflow: hidden;
`;

const Sidebar = styled.div`
	width: 250px;
	padding: 20px;
	margin-top: 20px;
	height: 100%;
	overflow-y: auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

	@media (max-width: 768px) {
		position: fixed;
		top: 60px;
		left: ${({ showDrawer }) => (showDrawer ? "0" : "-250px")};
		z-index: 1;
		transition: left 0.3s ease;
		width: 250px;
		background-color: #fff;
		color: white;
	}
`;

const MainContent = styled.div`
	flex: 1;
	padding: 20px;
	overflow-y: auto;

	@media (max-width: 768px) {
		padding: 0;
	}
`;
