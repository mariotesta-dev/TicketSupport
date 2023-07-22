import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import TicketsTable from "../components/TicketsTable";
import Backbutton from "../components/Backbutton";
import { useOutletContext } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useState } from "react";

function TicketDashboard() {
	// You can use the useOutletContext hook to get the current outlet's context (e.g. user, setUser, etc.. coming from /dashboard).
	const [user, setUser] = useOutletContext();

	return (
		<Flex width={"full"} flexGrow={1} alignContent={"stretch"}>
			<Flex
				flexGrow={10}
				minWidth={"135px"}
				maxWidth={"400px"}
				height={"full"}
				bg={"gray.100"}
				position={"relative"}>
				<Backbutton href={"/dashboard"} />
			</Flex>
			<TicketsTable/>
		</Flex>
	);
}

export default TicketDashboard;
