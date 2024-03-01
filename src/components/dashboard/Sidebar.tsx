import { dashboardIcon, autionIcon, messageIcon, wishlistIcon, orderIcon, setting, logout, showroom } from "../../assets/dashboard";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../../Service/contextApi/UserProvider";

type Name = {
	name: string;
	link: string;
	icon: string;
};
// Dashboard navbar list
const sidebarNav: Name[] = [
	{ name: "Dashboard", link: "/dashboard/main", icon: dashboardIcon },
	{ name: "Auction", link: "/dashboard/auction", icon: autionIcon },
	{ name: "My Cart", link: "/dashboard/wishlist", icon: wishlistIcon },
	{ name: "Showroom", link: "/dashboard/showroom", icon: showroom },
	{ name: "Orders", link: "/dashboard/order", icon: orderIcon },
	{ name: "Message", link: "/dashboard/message", icon: messageIcon },
];
const sidebarNavO: Name[] = [
	{ name: "Settings", link: "/dashboard/setting", icon: setting },
	{ name: "Logout", link: "/login", icon: logout },
];

const SidebarSection = () => {
	const { showDrawerHandle } = useUserContext();

	const role = localStorage.getItem("role");

	return (
		<>
			<div style={{ padding: "20px 0" }}>
				<SideBarTitle>Overview</SideBarTitle>
				{sidebarNav.map((nav, i) => {
					// if (role !== "Artist" && nav.name === "Showroom") {
					// 	return null; // Skip Showroom
					// }

					return (
						<StyledNavLink
							to={nav.link}
							key={i}
							style={({ isActive }) => ({ backgroundColor: isActive ? "#9fc7fd" : "" })}
							onClick={showDrawerHandle}>
							<img src={nav.icon} alt="dashboardIcon" />
							{nav.name}
						</StyledNavLink>
					);
				})}
			</div>

			<div>
				<SideBarTitle>Others</SideBarTitle>
				{sidebarNavO.map((nav, i) => (
					<StyledNavLink to={nav.link} key={i} style={({ isActive }) => ({ backgroundColor: isActive ? "#9fc7fd" : "" })} onClick={showDrawerHandle}>
						<img src={nav.icon} alt="dashboardIcon" />
						{nav.name}
					</StyledNavLink>
				))}
			</div>
		</>
	);
};

export default SidebarSection;

const SideBarTitle = styled.h3`
	font-size: 16px;
	font-weight: 400;
	color: #98a2b3;
	padding: 10px 0;
`;

// const SidebarItem = styled.div`
// 	padding: 10px;
// 	cursor: pointer;
// 	display: flex;
// 	align-items: center;
// 	gap: 10px;

// 	&:hover {
// 		background: #9fc7fd;
// 		border-radius: 10px;
// 	}
// `;

const StyledNavLink = styled(NavLink)`
	padding: 10px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 10px;
	color: #101828;
	font-size: 18px;
	font-weight: 500;
	text-decoration: none;
	border-radius: 10px;

	i {
		margin-right: 10px;
	}
	&:hover {
		color: #9fc7fd;
	}
`;
