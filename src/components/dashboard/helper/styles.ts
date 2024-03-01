import styled from "styled-components";

export const ContentSection = styled.div`
	margin: 20px;
	margin-top: 40px;
`;

export const ArtistSection = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-gap: 20px;
	margin-top: 10px;
	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

export const FeaturedSection = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 20px;
	margin-top: 10px;
	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

export const ProfileAvatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
`;

export const FlexIcon = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;
