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
import { authAPI } from "../API";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function SignUp({ jwtToken }) {
	if (jwtToken) {
		return <Navigate to="/dashboard" replace />;
	}
	return <SignupCard />;
}

function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);

	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const navigate = useNavigate();

	const handleSignUp = async () => {
		setLoading(true);
		// TODO validation
		try {
			const res = await authAPI.signUp({
				username: email,
				password: password,
				email: email,
				firstName: firstName,
				lastName: lastName,
			});
			toast.success("Sign up successful");
			localStorage.setItem("jwtToken", res.access_token);
			toast.success("Login successful");
			setInterval(() => {
				navigate(0); // refresh page so that Navigate to /dashboard is triggered by jwtToken existence
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
										type="text"
										value={firstName}
										onChange={(event) => setFirstName(event.target.value)}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="lastName">
									<FormLabel>Last Name</FormLabel>
									<Input
										type="text"
										value={lastName}
										onChange={(event) => setLastName(event.target.value)}
									/>
								</FormControl>
							</Box>
						</HStack>
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
								loadingText="Submitting"
								size="lg"
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={() => handleSignUp()}
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
		</Flex>
	);
}
