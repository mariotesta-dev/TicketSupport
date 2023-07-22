import { useEffect, useState } from "react";
import { customersAPI } from "../../api/API";
import toast from "react-hot-toast";
import { CircularProgress, Flex } from "@chakra-ui/react";
import * as session from '../../utils/SessionUtils.js'; 

export default function ExpertDashboard() {
	const decodedJWT = session.getDecodedJwtToken()
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const handleGetUser = async () => {
			try {
				const res = await customersAPI.getExpert(decodedJWT.email);
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
				<p>Hello expert, {user.name}!</p>
			)}
		</div>
	);
}
