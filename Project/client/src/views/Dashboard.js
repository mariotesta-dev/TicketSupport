import React from "react";
import Dashbar from "../components/Dashbar";
import { Stack } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";

function Dashboard() {
	const jwtToken = localStorage.getItem("jwtToken");
	const user = jwt_decode(jwtToken);

	return (
		<Stack>
			<Dashbar jwtToken={jwtToken} user={user} />
			<p>
				This user's roles are: <b>[{user.resource_access.ticketing.roles}]</b>
			</p>
		</Stack>
	);
}

export default Dashboard;
