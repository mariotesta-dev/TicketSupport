import React from "react";
import Dashbar from "../components/Dashbar";
import { Stack } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import CustomerDashboard from "../components/dashboard/CustomerDashboard";
import ManagerDashboard from "../components/dashboard/ManagerDashboard";
import ExpertDashboard from "../components/dashboard/ExpertDashboard";

function Dashboard() {
	const jwtToken = localStorage.getItem("jwtToken");
	const decodedJWT = jwt_decode(jwtToken);
	const role = decodedJWT.resource_access.ticketing.roles[0];
	return (
		<Stack height={"100vh"}>
			<Dashbar jwtToken={jwtToken} user={decodedJWT} />
			{role.match("customer") && <CustomerDashboard decodedJWT={decodedJWT} />}

			{role.match("expert") && <ExpertDashboard decodedJWT={decodedJWT} />}

			{role.match("manager") && <ManagerDashboard decodedJWT={decodedJWT} />}
		</Stack>
	);
}

export default Dashboard;
