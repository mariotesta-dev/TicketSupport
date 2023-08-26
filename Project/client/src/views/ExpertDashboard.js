import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import TicketsTable from "../components/tickets/TicketsTable";
import Sidebar from "../components/Sidebar";
import { useOutletContext } from "react-router-dom";
import * as session from "../utils/SessionUtils.js";
import { managersAPI } from "../api/API.js";
import ExpertsTable from "../components/experts/ExpertsTable";

function ExpertDashboard() {
	const [user] = useOutletContext();
	const role = session.getUserRole();
	const [experts, setExperts] = useState([]);
	const [filter, setFilter] = useState("All");

	const [filteredExperts, setFilteredExperts] = useState([]);

	useEffect(() => {
		const handleGetExperts = async () => {
			const response = await managersAPI.getAllExperts();
			setExperts(response);
			setFilteredExperts(response);
		};
		handleGetExperts();
	}, [user, role]);

	return (
		<Flex width={"full"}>
			<Sidebar
				data={experts}
				filteredData={filteredExperts}
				setData={setFilteredExperts}
				filter={filter}
				setFilter={setFilter}
				type="experts"
			/>
			<ExpertsTable experts={filteredExperts} filter={filter}/>
		</Flex>
	);
}

export default ExpertDashboard;
