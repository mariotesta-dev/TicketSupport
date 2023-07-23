import React, { useState } from "react";

import { authAPI } from "../api/API";

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import Backbutton from "../components/Backbutton";
import { Navigate, useNavigate } from "react-router-dom";
import * as session from "../utils/SessionUtils.js";

export default function SignIn() {
	if (session.getJwtToken()) {
		return <Navigate to="/dashboard" replace />;
	}
	return <SimpleCard />;
}

function SimpleCard() {
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleSignIn = async () => {
		setLoading(true);
		// TODO validation
		try {
			const res = await authAPI.login({
				grant_type: "password",
				client_id: "ticketing",
				username: username,
				password: password,
			});
			session.setJwtToken(res.access_token);
			toast.success("Login successful");
			setInterval(() => {
				navigate(0); // refresh page so that Navigate to /dashboard is triggered by jwtToken existence
			}, 500);
		} catch (error) {
			console.log("ERROR " + error);
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
					<Heading fontSize={"4xl"}>Sign in</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}>
					<Stack spacing={4}>
						<FormControl id="email">
							<FormLabel>Email</FormLabel>
							<Input
								type="email"
								value={username}
								onChange={(event) => setUsername(event.target.value)}
							/>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
						</FormControl>
						<Stack spacing={10}>
							<Stack
								direction={{ base: "column", sm: "row" }}
								align={"start"}
								justify={"space-between"}>
								<Checkbox display={"none"}>Remember me</Checkbox>
								<Link display={"none"} color={"blue.400"}>
									Forgot password?
								</Link>
							</Stack>
							<Button
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={() => handleSignIn()}
								isLoading={loading}>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
				<Text fontSize={"lg"} color={"gray.600"} textAlign={"center"}>
					Don't you have an account?{" "}
					<Link href="/signup" color={"blue.400"}>
						Sign Up
					</Link>
				</Text>
			</Stack>
		</Flex>
	);
}
