import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Search = () => {
	return (
		<SearchContainer>
			<SearchInput type="text" placeholder="Search" />
			<SearchButton type="submit">
				<FaSearch />
			</SearchButton>
		</SearchContainer>
	);
};

const SearchContainer = styled.div`
	position: relative;
	width: 30%;
	border-radius: 50px;
`;

const SearchInput = styled.input`
	width: 100%;
	padding: 8px 10px 8px 30px;
	border: 1px solid #ccc;
	border-radius: 16px;
	outline: none;

	@media (max-width: 768px) {
		width: 170px;
	}
`;

const SearchButton = styled.button`
	position: absolute;
	top: 1px;
	left: 2px;
	bottom: 1px;
	padding: 10px 3px 10px 10px;
	border: none;
	background: #fff;
	border-radius: 16px;
	color: #ccc;
	cursor: pointer;
`;

export default Search;
