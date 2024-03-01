import React, { useState } from "react";
import { person, password, } from "../../assets/Settings";
import styled from "styled-components";
import { Password, PersonalDetails } from ".";

type Name = {
	id: number;
	name: string;
	link: string;
	icon: string;
};
// settings navbar list
const sidebarNav: Name[] = [
	{ id: 1, name: "Personal Details", link: "/Settings/PersonalDetails", icon: person },
	//{id: 2, name: "Payment Method", link: "/Settings/payment", icon: payment },
	{ id: 2, name: "Password", link: "/Settings/password", icon: password },
	//{ id:4,name: "Language", link: "/Settings/language", icon: language },
];


const Settings = () => {
	const [component, setComponent] = useState(<PersonalDetails />)

	const changeStep = (num: number) => {
		switch (num) {
			case 1:
				setComponent(<PersonalDetails />)
				break;
			case 2:
				setComponent(<Password />)
				break;
			default:
				setComponent(<PersonalDetails />)
			// case 3:
			// 	setComponent(<Password/>)
			// 	break;
			// case 4:
			// 	setComponent(<Language/>)
			// 	break;
			// default:
			// 	setComponent(<PersonalDetails/>)
		}
	}
	return (
		<MotherDiv>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div className=" dropbtn">
					<SettingTitle>Account Settings</SettingTitle>
					{sidebarNav.map((set, i) => (
						<Tags onClick={() => changeStep(set.id)} key={i} style={{ marginBottom: '17px' }}><img src={set.icon} className="icon" />{set.name}</Tags>

					))}
				</div>
				<div className="comp">
					{component}
				</div>
			</div>
		</MotherDiv>
	);
};

export default Settings;


const Tags = styled.p`
	cursor: pointer;
	.icon{
		margin-top: -5px;
		padding-top: 10px;
		padding-right: 15px;
		/* margin-bottom: -5px; */
	}
	&:hover {
		height: 30px;
		border-radius: 10px;
       background-color: #86b5e7;
  }	
`;

const SettingTitle = styled.h3`
    font-family: 'Montserrat Alternates';
	font-size: 24px;
	font-weight: 500;
	color: black;
	padding: 10px 0;
	margin-top: 40px;
	line-height: 29.26px;
`;

const MotherDiv = styled.div`
/* background-color: pink; */
   margin-left: 20px;

	@media screen and (max-width: 600px) {
    width: 100% ;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 7px;
    height: auto; /*70%;*/
    padding: 16px;
	}
	.dropbtn{
		gap: 5px;
		@media screen and (max-width: 730px) {
			gap: 10px;
			margin-right: 5px;
		}
	}
	.comp{
		padding: 1px;
		gap: 5px;
	}
`;
