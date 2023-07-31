import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import TicketsTable from "../components/tickets/TicketsTable";
import Sidebar from "../components/Sidebar";
import { useOutletContext } from "react-router-dom";
import * as session from "../utils/SessionUtils.js";
import { ticketsAPI } from "../api/API.js";

function TicketDashboard() {
	const [user] = useOutletContext();
	const role = session.getUserRole();
	const [tickets, setTickets] = useState([]);
	const [filter, setFilter] = useState("All");

	const [filteredTickets, setFilteredTickets] = useState([]);

	useEffect(() => {
		const handleGetTickets = async () => {
			if (session.isCustomer()) {
				setTickets(user.tickets);
				setFilteredTickets(user.tickets);
			}
			if (session.isManager()) {
				const response = await ticketsAPI.getTickets();
				setTickets(response);
				setFilteredTickets(response);
			}
			if (session.isExpert()) {
				setTickets(user.tickets);
				setFilteredTickets(user.tickets);
			}
		};
		handleGetTickets();
	}, [user, role]);

	return (
		<Flex width={"full"}>
			<Sidebar
				data={tickets}
				filteredData={filteredTickets}
				setData={setFilteredTickets}
				filter={filter}
				setFilter={setFilter}
				type="tickets"
			/>
			<TicketsTable tickets={filteredTickets} filter={filter}/>
		</Flex>
	);
}

export default TicketDashboard;
