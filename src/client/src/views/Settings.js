import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Avatar,
	Center,
	Text,
	Tooltip,
	HStack,
	Box,
} from "@chakra-ui/react";
import { usersAPI } from "../api/API";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDecodedJwtToken } from "../utils/SessionUtils";

function Settings() {
	const user = getDecodedJwtToken();

	return (
		<Box w={"full"} h={"full"} bg={"gray.50"}>
			<Flex
				w={"full"}
				h={"full"}
				direction={"column"}
				maxW={"container.lg"}
				mx={"auto"}
				p={10}
				gap={8}
				bg={"gray.50"}>
				<Text fontSize={"3xl"} fontWeight={"bold"}>
					Settings
				</Text>
				<UserProfileEdit user={user} />
			</Flex>
		</Box>
	);
}

function UserProfileEdit({ user }) {
	const navigate = useNavigate();

	const [email, setEmail] = useState(user.email);
	const [name, setName] = useState(user.given_name);
	const [surname, setSurname] = useState(user.family_name);

	const [loading, setLoading] = useState(false);

	const handleUpdateUser = async () => {
		setLoading(true);
		try {
			await usersAPI.updateCustomer(user.email, {
				email: email,
				name: name,
				surname: surname,
			});
			toast.success("User updated successfully.");
			navigate("/dashboard");
		} catch (error) {
			toast.error("Unable to update user.");
		}
		setLoading(false);
	};

	return (
		<Stack
			spacing={7}
			w={"full"}
			rounded={"xl"}
			boxShadow={"lg"}
			p={12}
			bg={"white"}>
			<FormControl id="userName">
				<Stack direction={["column", "row"]} spacing={6}>
					<Center>
						<Avatar size="xl" name={user.name} />
					</Center>
					<Center w="full">
						<Tooltip
							p={3}
							rounded={"xl"}
							textAlign={"center"}
							placement="top"
							hasArrow
							label="This feature is not available yet."
							bg="blue.100"
							color="black">
							<Button w="full" isDisabled>
								Change Profile Picture
							</Button>
						</Tooltip>
					</Center>
				</Stack>
			</FormControl>
			<HStack>
				<FormControl id="userName" isRequired>
					<FormLabel>Name</FormLabel>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
						_placeholder={{ color: "gray.500" }}
						type="text"
					/>
				</FormControl>
				<FormControl id="email" isRequired>
					<FormLabel>Surname</FormLabel>
					<Input
						value={surname}
						onChange={(e) => setSurname(e.target.value)}
						placeholder="Surname"
						_placeholder={{ color: "gray.500" }}
						type="text"
					/>
				</FormControl>
			</HStack>

			<FormControl id="email" isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="your-email@example.com"
					_placeholder={{ color: "gray.500" }}
					type="email"
				/>
			</FormControl>
			<Stack spacing={6} direction={["column", "row"]}>
				<Button
					isDisabled={loading}
					as={"a"}
					href="/dashboard"
					p={6}
					bg={"red.400"}
					color={"white"}
					w="full"
					_hover={{
						bg: "red.500",
					}}>
					Cancel
				</Button>
				<Button
					idLoading={loading}
					p={6}
					bg={"blue.400"}
					color={"white"}
					w="full"
					_hover={{
						bg: "blue.500",
					}}
					onClick={() => handleUpdateUser()}>
					Save changes
				</Button>
			</Stack>
		</Stack>
	);
}

export default Settings;
