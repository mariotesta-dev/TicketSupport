import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import TicketsTable from "../components/TicketsTable";
import Sidebar from "../components/Sidebar";
import { useOutletContext } from "react-router-dom";

function TicketDashboard() {
	const [user] = useOutletContext();
	const [tickets, setTickets] = useState(user.tickets);
	const [filter, setFilter] = useState("All");

	return (
		<Flex width={"full"} flexGrow={1} alignContent={"stretch"}>
			<Sidebar
				user={user}
				setTickets={setTickets}
				filter={filter}
				setFilter={setFilter}
			/>
			<TicketsTable tickets={tickets} filter={filter} />
		</Flex>
	);
}

export default TicketDashboard;
