import {
	Heading,
	Avatar,
	Box,
	Center,
	Text,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";

export default function UserCard({ user }) {
	return <SocialProfileSimple {...user} />;
}

function SocialProfileSimple({
	id,
	email,
	name,
	surname,
	warranties,
	tickets,
}) {
	return (
		<Center py={6}>
			<Box
				maxW={"320px"}
				w={"lg"}
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"2xl"}
				rounded={"lg"}
				p={6}
				textAlign={"center"}>
				<Avatar
					name={`${name} ${surname}`}
					alt={"Avatar Alt"}
					mb={4}
					pos={"relative"}
				/>
				<Heading fontSize={"2xl"} fontFamily={"body"}>
					{`${name} ${surname}`}
				</Heading>
				<Text fontWeight={600} color={"gray.500"} mb={4}>
					{email}
				</Text>

				<Stack direction={"row"} justify={"center"} spacing={6}>
					<Stack spacing={0} align={"center"}>
						{/* <Text fontWeight={600}>{warranties.length}</Text> */}
						<Text fontSize={"sm"} color={"gray.500"}>
							Warranties
						</Text>
					</Stack>
					<Stack spacing={0} align={"center"}>
						{/* <Text fontWeight={600}>{tickets.length}</Text> */}
						<Text fontSize={"sm"} color={"gray.500"}>
							Tickets
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Center>
	);
}
