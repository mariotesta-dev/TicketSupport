import React from "react";
import Dashbar from "../components/Dashbar";
import { Box, Stack } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import NewTicketButton from "../components/NewTicketButton";
import TicketsTable from "../components/TicketsTable";

function TicketDashboard() {
	const jwtToken = localStorage.getItem("jwtToken");
	const user = jwt_decode(jwtToken);

	return (
		<Stack direction='column'>
			<Dashbar jwtToken={jwtToken} user={user} />
			<Box
				px={300}
				py={12}
  			>
				<TicketsTable/>
				<NewTicketButton/>
			</Box>
		</Stack>
	);
}

export default TicketDashboard;
