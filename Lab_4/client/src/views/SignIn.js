import React, { useState } from "react";

import { authAPI } from "../API";

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

export default function SignIn() {
	const [username, setUsername] = useState("");
	const [passowrd, setPassowrd] = useState("");

	const signInProps = [username, setUsername, passowrd, setPassowrd];

	return <SimpleCard {...signInProps} />;
}

function SimpleCard({ username, setUsername, password, setPassword }) {
	const [loading, setLoading] = useState(false);

	const handleSignIn = async () => {
		setLoading(true);
		// TODO validation
		try {
			await authAPI.login({
				username: username,
				password: password,
			});
			toast.success("Login successful");
		} catch (error) {
			toast.error("Login failed");
		}
		setLoading(false);
	};

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}>
			<Backbutton />
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
							<Input type="email" />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input type="password" />
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
