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
	Center,
} from "@chakra-ui/react";

import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import { useState } from "react";
import { useOutletContext } from "react-router-dom";
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
	const [user, setUser] = useOutletContext();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await productsAPI.getProducts();
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
			console.log("EAN = " + product.ean);

			await ticketsAPI.createNewTicket({
				product: { ean: product.ean },
				category: category,
				summary: summary,
				description: description,
			});
			toast.success("Ticket created successfully");

			setInterval(() => {
				navigate("/dashboard/tickets"); // refresh page so that Navigate to /dashboard is triggered by jwtToken existence
			}, 500);
		} catch (error) {
			toast.error(error.detail);
		}
		setLoading(false);
	};

	const handleProductSelection = (selectedProductName) => {
		const selectedProduct = products.find(
			(p) => p.name === selectedProductName
		);
		setProduct(selectedProduct);
	};

	return (
		<Center height={"full"} width={"full"}>
			<Backbutton href="/dashboard/tickets" />
			<Stack spacing={8} mx={"auto"} maxW={"lg"} mb={10} py={12} px={6}>
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
								<FormControl w="60">
									<FormLabel>Product</FormLabel>
									<Select
										placeholder="Select a product"
										onChange={(event) =>
											handleProductSelection(event.target.value)
										}>
										{user.warranties.map((warranty) => (
											<option key={warranty.product.ean}>
												{warranty.product.name}
											</option>
										))}
									</Select>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="category">
									<FormLabel>Category</FormLabel>
									<Select
										placeholder="Select a category"
										onChange={(event) => setCategory(event.target.value)}>
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
			</Stack>
		</Center>
	);
}
