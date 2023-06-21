import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "feature/api";
import { useSelector } from "react-redux";

const Layout = () => {
	const isNonMobile = useMediaQuery("(min-width: 600px)");
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const userId = useSelector((state) => state.global.userId);
	const { data } = useGetUserQuery(userId);
	console.log("🚀 ~ file: index.jsx:14 ~ Layout ~ data:", data);

	return (
		<Box display={isNonMobile ? "flex" : "block"} width='100%' height='100%'>
			<Sidebar
				user={data || {}}
				drawerWidth='250px'
				isNonMobile={isNonMobile}
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Box width='100%'>
				<Navbar
					user={data || {}}
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;
