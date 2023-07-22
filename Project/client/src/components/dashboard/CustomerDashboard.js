import { useEffect, useState } from "react";
import { customersAPI } from "../../API";
import toast from "react-hot-toast";
import { CircularProgress, Flex } from "@chakra-ui/react";

export default function CustomerDashboard({ decodedJWT }) {
	const [user, setUser] = useState("");
	const [loading, setLoading] = useState("");

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
		<div>
			{loading ? (
				<Flex flexGrow={1} justifyContent={"center"} alignItems={"center"}>
					<CircularProgress
						isIndeterminate
						color="blue.400"
						thickness="4px"
						size="50px"
					/>
				</Flex>
			) : (
				<p>Hello customer, {user.name}!</p>
			)}
		</div>
	);
}
