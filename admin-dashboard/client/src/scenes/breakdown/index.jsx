import React from "react";
import Header from "components/Header";
import BreakDownChart from "components/BreakDownChart";
import { Box } from "@mui/material";

const Breakdown = () => {
	return (
		<Box m='1.5rem 2rem'>
			<Header title='BREAKDOWN' subtitle='Breakdown of Sales By Category' />
			<Box mt='40px' height='70vh'>
				<BreakDownChart />
			</Box>
		</Box>
	);
};

export default Breakdown;
