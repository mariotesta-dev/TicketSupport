import React from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import NewTicketButton from "../components/NewTicketButton";
import TicketsTable from "../components/TicketsTable";
import Backbutton from "../components/Backbutton";
import { useOutletContext } from "react-router-dom";

function TicketDashboard() {
	// You can use the useOutletContext hook to get the current outlet's context (e.g. user, setUser, etc.. coming from /dashboard).
	const [user, setUser] = useOutletContext();

	return (
		<>
			<Backbutton href={"/dashboard"} />
			<Stack>
				<TicketsTable />
				<NewTicketButton />
			</Stack>
		</>
	);
}

export default TicketDashboard;
