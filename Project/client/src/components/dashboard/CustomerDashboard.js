import { useEffect, useState } from "react";
import { customersAPI } from "../../api/API";
import toast from "react-hot-toast";
import { Center, CircularProgress, Flex, Stack } from "@chakra-ui/react";
//import UserCard from "../UserCard";
import { Outlet } from "react-router-dom";
import * as session from '../../utils/SessionUtils.js'; 

export default function CustomerDashboard() {
	const decodedJWT = session.getDecodedJwtToken()
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const handleGetUser = async () => {
			try {
				const res = await customersAPI.getCustomer(decodedJWT.email);
				setUser(res);
			} catch (error) {
				toast.error("Unable to get user");
			}
			setLoading(false);
		};

		handleGetUser();
	}, [decodedJWT.email]);

	return (
		<Stack height={"100%"} width={"100%"} position={"relative"}>
			<Flex height={"full"} width={"full"}>
				{loading ? (
					<Center height={"full"} width={"full"}>
						<CircularProgress
							isIndeterminate
							color="blue.400"
							thickness="4px"
							size="50px"
						/>
					</Center>
				) : (
					user && <Outlet context={[user, setUser]} />
				)}
			</Flex>
		</Stack>
	);
}
