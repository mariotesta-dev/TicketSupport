import { useEffect, useState } from "react";
import { customersAPI } from "../../API";
import toast from "react-hot-toast";
import { Box, CircularProgress, Flex, Stack } from "@chakra-ui/react";
import UserCard from "../UserCard";
import Backbutton from "../Backbutton";

export default function CustomerDashboard({ decodedJWT }) {
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
			<Flex height={"full"} justifyContent={"center"} alignItems={"center"}>
				{loading ? (
					<CircularProgress
						isIndeterminate
						color="blue.400"
						thickness="4px"
						size="50px"
					/>
				) : (
					<UserCard user={user} />
				)}
			</Flex>
		</Stack>
	);
}
