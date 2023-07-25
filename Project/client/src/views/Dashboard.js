import React from "react";
import Dashbar from "../components/dashboard/Dashbar";
import { Stack } from "@chakra-ui/react";
import CustomerDashboard from "../components/dashboard/CustomerDashboard";
import ManagerDashboard from "../components/dashboard/ManagerDashboard";
import ExpertDashboard from "../components/dashboard/ExpertDashboard";
import * as session from "../utils/SessionUtils.js";

function Dashboard() {
	const role = session.getUserRole();
	return (
		<Stack height={"100vh"} spacing={0}>
			<Dashbar />
			{role.match("customer") && <CustomerDashboard />}

			{role.match("expert") && <ExpertDashboard />}

			{role.match("manager") && <ManagerDashboard />}
		</Stack>
	);
}

export default Dashboard;
