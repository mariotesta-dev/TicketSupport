import React from "react";
import {
	FormControl,
	Stack,
	Button,
	Heading,
	useColorModeValue,
	Center,
	HStack,
	FormLabel,
	Select,
	Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Backbutton from "../components/Backbutton";
import { authAPI } from "../api/API";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewExpert() {
	return <NewExpertCard />;
}

function NewExpertCard() {
	const [user] = useOutletContext();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [expertise, setExpertise] = useState("");

	const navigate = useNavigate();

	const handleCreateExpert = async (e) => {
		e.preventDefault();
		setLoading(true);
		// TODO validation
		try {
			await authAPI.signUpExpert({
				username: username,
				password: password,
				email: email,
				firstName: name,
				lastName: surname,
				expertise: expertise,
			});
			toast.success("Expert created successfully");

			setInterval(() => {
				navigate("/dashboard/experts");
				navigate(0); //to force refresh
			}, 1000);
		} catch (error) {
			toast.error(error.detail);
		}
		setLoading(false);
	};

	return (
		<Center height={"full"} width={"full"} bg={"gray.50"}>
			<Backbutton href="/dashboard/experts" />
			<Stack
				spacing={4}
				w={"full"}
				maxW={"3xl"}
				bg={useColorModeValue("white", "gray.700")}
				rounded={"xl"}
				boxShadow={"lg"}
				p={10}
				my={10}>
				<Center>
					<Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
						Add a new expert
					</Heading>
				</Center>

				<form onSubmit={handleCreateExpert}>
					<Stack spacing={4} w={"full"} maxW={"3xl"}>
						<HStack w={"full"} maxW={"3xl"}>
							<FormControl isRequired>
								<FormLabel>Name</FormLabel>
								<Input
									pattern="^[a-zA-Z]+"
									placeholder="Name"
									type="text"
									value={name}
									onChange={(event) => setName(event.target.value)}
								/>
							</FormControl>

							<FormControl isRequired>
								<FormLabel>Surname</FormLabel>
								<Input
									pattern="^[a-zA-Z]+"
									placeholder="Surname"
									type="text"
									value={surname}
									onChange={(event) => setSurname(event.target.value)}
								/>
							</FormControl>
						</HStack>

						<HStack w={"full"} maxW={"3xl"}>
							<FormControl isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									placeholder="Username"
									type="text"
									value={username}
									onChange={(event) => setUsername(event.target.value)}
								/>
							</FormControl>
							<FormControl id="category" isRequired>
								<FormLabel>Expertise</FormLabel>
								<Select
									value={expertise}
									placeholder="Select the expertise"
									onChange={(event) => setExpertise(event.target.value)}>
									<option>INFORMATION</option>
									<option>HARDWARE</option>
									<option>MAINTENANCE</option>
									<option>NETWORK</option>
									<option>SOFTWARE</option>
									<option>PAYMENT_ISSUES</option>
									<option>BUG_REPORTS</option>
									<option>OTHER</option>
								</Select>
							</FormControl>
						</HStack>

						<FormControl isRequired>
							<FormLabel>Email</FormLabel>
							<Input
								placeholder="Email"
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<Input
								placeholder="Password"
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
						</FormControl>

						<Stack spacing={6} pt={10}>
							<Button
								type="submit"
								isLoading={loading}
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}>
								Add
							</Button>
						</Stack>
					</Stack>
				</form>
			</Stack>
		</Center>
	);
}
