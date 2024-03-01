import styled from "styled-components";
import { useUserContext } from "../../Service/contextApi/UserProvider";
import { marisPic, notification, logo } from "../../assets/dashboard";
import { FaTimes, FaBars } from "react-icons/fa";
import SearchInput from "./helper/Search";

const Nav = () => {
	const localName = localStorage.getItem("username");
const picture = localStorage.getItem("profilePic");
	console.log(localName);
	const { showDrawer, showDrawerHandle } = useUserContext();

	return (
		<Navbar>
			<Hamburger>{showDrawer ? <FaTimes onClick={showDrawerHandle} /> : <FaBars onClick={showDrawerHandle} />}</Hamburger>
			<Logo onClick={showDrawerHandle}>
				<img src={logo} alt="logo" height="100%" width="100%" />
			</Logo>
			<SearchInput />
			<Profile>
				<img src={notification} alt="Notification" />
				<ProfileAvatar src={!picture? marisPic: picture} alt="Profile" />
				<ProfileSpan>{localName}</ProfileSpan>
			</Profile>
		</Navbar>
	);
};

export default Nav;

const Navbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 40px 20px 20px;
	background: #fff;
	/* color: #fff; */
	position: fixed;
	z-index: 1;
	width: 100%;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

	@media (max-width: 768px) {
		padding: 20px;
	}
`;

const Hamburger = styled.span`
	display: none;
	font-size: 30px;
	vertical-align: middle;
	cursor: pointer;
	@media (max-width: 768px) {
		display: block;
	}
`;

const Logo = styled.h1`
	font-size: 24px;
	cursor: pointer;

	@media (max-width: 768px) {
		display: none;
	}
`;

const Profile = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	cursor: pointer;
`;

const ProfileSpan = styled.span`
	display: block;
	@media (max-width: 768px) {
		display: none;
	}
`;

const ProfileAvatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
`;
