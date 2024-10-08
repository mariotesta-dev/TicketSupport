import React from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Backbutton from "../components/Backbutton";
import { authAPI } from "../api/API";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import * as session from "../utils/SessionUtils.js";

export default function SignUp() {
	if (session.getJwtToken()) {
		return <Navigate to="/dashboard" replace />;
	}
	return <SignupCard />;
}

function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);

	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		setLoading(true);
		// TODO validation
		try {
			await authAPI.signUp({
				username: username,
				password: password,
				email: email,
				firstName: firstName,
				lastName: lastName,
			});
			toast.success("Sign up successful. Please log in.");
			setInterval(() => {
				navigate("/signin"); // refresh page so that Navigate to /dashboard is triggered by jwtToken existence
			}, 500);
		} catch (error) {
			toast.error(error.detail);
		}
		setLoading(false);
	};

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}>
			<Backbutton href={"/"} />
			<form onSubmit={handleSignUp}>
				<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
					<Stack align={"center"}>
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Sign up
						</Heading>
					</Stack>
					<Box
						rounded={"lg"}
						bg={useColorModeValue("white", "gray.700")}
						boxShadow={"lg"}
						p={8}>
						<Stack spacing={4}>
							<HStack>
								<Box>
									<FormControl id="firstName" isRequired>
										<FormLabel>First Name</FormLabel>
										<Input
											pattern="^[a-zA-Z]+"
											type="text"
											value={firstName}
											onChange={(event) => setFirstName(event.target.value)}
										/>
									</FormControl>
								</Box>
								<Box>
									<FormControl id="lastName" isRequired>
										<FormLabel>Last Name</FormLabel>
										<Input
											pattern="^[a-zA-Z]+"
											type="text"
											value={lastName}
											onChange={(event) => setLastName(event.target.value)}
										/>
									</FormControl>
								</Box>
							</HStack>
							<FormControl id="username" isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									type="text"
									value={username}
									onChange={(event) => setUsername(event.target.value)}
								/>
							</FormControl>
							<FormControl id="email" isRequired>
								<FormLabel>Email address</FormLabel>
								<Input
									type="email"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(event) => setPassword(event.target.value)}
									/>
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() =>
												setShowPassword((showPassword) => !showPassword)
											}>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									type="submit"
									loadingText="Submitting"
									size="lg"
									bg={"blue.400"}
									color={"white"}
									_hover={{
										bg: "blue.500",
									}}
									isLoading={loading}>
									Sign up
								</Button>
							</Stack>
						</Stack>
					</Box>
					<Text fontSize={"lg"} color={"gray.600"} textAlign={"center"}>
						Already a user?{" "}
						<Link href="/signin" color={"blue.400"}>
							Sign In
						</Link>
					</Text>
				</Stack>
			</form>
		</Flex>
	);
}
