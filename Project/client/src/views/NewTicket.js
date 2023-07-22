import React, { useEffect } from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	FormHelperText,
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
	Textarea,
	Select,
} from "@chakra-ui/react";

import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Backbutton from "../components/Backbutton";
import { ticketsAPI } from "../API";
import { productsAPI } from "../API";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function NewTicket({ jwtToken }) {
	if (jwtToken) {
		return <Navigate to="/dashboard" replace />;
	}
	return <NewTicketCard />;
}

function NewTicketCard() {

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await productsAPI.getAllProducts();
				setProducts(res);
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProducts();
	}, []);

	const [products, setProducts] = useState([]);

	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState("");
	const [category, setCategory] = useState("");
	const [summary, setSummary] = useState("");
	const [description, setDescription] = useState("");

	const navigate = useNavigate();

	const handleCreateTicket = async () => {
		setLoading(true);
		// TODO validation
		try {
			const res = await ticketsAPI.createNewTicket({
				product: product,
				category: category,
				summary: summary,
				description: description
			});
			toast.success("Ticket created successfully");

			setInterval(() => {
				navigate('/tickets'); // refresh page so that Navigate to /dashboard is triggered by jwtToken existence
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
			<Backbutton />
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Create a new ticket
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
								<FormControl id="product" isRequired>
									<FormLabel>Product</FormLabel>
									<Input
										type="text"
										value={product}
										onChange={(event) => setProduct(event.target.value)}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="category">
									<FormLabel>Category</FormLabel>
									<Select
										placeholder='Select a category'
										onChange={(event) => setCategory(event.target.value)}
									>
										<option>INFORMATION</option>
										<option>HARDWARE</option>
										<option>MAINTENANCE</option>
										<option>NETWORK</option>
										<option>SOFTWARE</option>
										<option>PAYMENT ISSUES</option>
										<option>BUG REPORTS</option>
										<option>OTHER</option>
									</Select>
								</FormControl>
							</Box>
						</HStack>
						<FormControl id="summary" isRequired>
							<FormLabel>Summary</FormLabel>
							<Input
								placeholder="Describe your problem in few words"
								type="text"
								value={summary}
								onChange={(event) => setSummary(event.target.value)}
							/>
						</FormControl>
						<FormControl id="description" isRequired>
							<FormLabel>Description</FormLabel>
							<Textarea
								placeholder="Insert a description of your problem here"
								value={description}
								onChange={(event) => setDescription(event.target.value)}
							/>
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
								onClick={() => handleCreateTicket()}
								isLoading={loading}>
								Create a ticket
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
