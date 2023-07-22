import { useState } from "react";
import { CircularProgress, Flex } from "@chakra-ui/react";

export default function ManagerDashboard({ decodedJWT }) {
	const [loading, setLoading] = useState(false);

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
				<p>Hello manager, {decodedJWT.name}!</p>
			)}
		</div>
	);
}
