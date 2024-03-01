import React, { useEffect } from "react";
import { useUserContext } from "../../Service/contextApi/UserProvider";
import { ContentSection, FeaturedSection } from "./helper/styles";
import { Card } from "./helper/Card";
import arrowLeft from "../../assets/dashboard/arrowLeft.svg";
import { Link } from "react-router-dom";

const Category = () => {
	const { arts } = useUserContext();
	// console.log(arts);
	useEffect(() => {}, [arts]);

	return (
		<div>
			<Link to="/dashboard">
				<img src={arrowLeft} alt="" style={{ margin: "10px 20px", cursor: "pointer" }} />
			</Link>
			<ContentSection>
				<h3>{arts && arts[0].category}</h3>
				<FeaturedSection>
					{arts.map((feature, index) => (
						<Card key={index} image={feature.img} title={feature.name} />
					))}
				</FeaturedSection>
			</ContentSection>
		</div>
	);
};

export default Category;
