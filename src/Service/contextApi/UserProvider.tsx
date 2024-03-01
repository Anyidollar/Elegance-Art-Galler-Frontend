import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }:any) => {
	const [showDrawer, setShowDrawer] = useState(false);

	const showDrawerHandle = () => {
		setShowDrawer(!showDrawer);
	};

	return <UserContext.Provider value={{ showDrawer, showDrawerHandle }}>{children}</UserContext.Provider>;
};
