import React from "react";
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	HStack,
	Stack,
	Button,
	Heading,
	useColorModeValue,
	Center,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Backbutton from "../components/Backbutton";
import { productsAPI } from "../api/API";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/SessionUtils";

export default function CreateProduct() {
	if (getUserRole() !== "manager") {
		return <Navigate to="/dashboard/products" replace />;
	}
	return <NewTicketCard />;
}

function NewTicketCard() {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [brand, setBrand] = useState("");
	const [quantity, setQuantity] = useState(1);

	const navigate = useNavigate();

	const handleCreateProduct = async (e) => {
		e.preventDefault();
		setLoading(true);
		// TODO validation
		try {
			await productsAPI.createProduct({
				name: name,
				brand: brand,
				quantity: quantity,
			});
			toast.success("Product(s) added successfully");

			setInterval(() => {
				navigate("/dashboard/products");
				navigate(0); //to force refresh
			}, 500);
		} catch (error) {
			toast.error(error.detail);
		}
		setLoading(false);
	};

	return (
		<Center height={"full"} width={"full"}>
			<Backbutton href="/dashboard/products" />
			<form onSubmit={handleCreateProduct}>
				<Stack spacing={8} mx={"auto"} maxW={"lg"} mb={10} py={12} px={6}>
					<Stack align={"center"}>
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Add new product(s)
						</Heading>
					</Stack>
					<Box
						rounded={"lg"}
						bg={useColorModeValue("white", "gray.700")}
						boxShadow={"lg"}
						p={8}>
						<Stack spacing={4}>
							<Box>
								<FormControl id="product_name" isRequired>
									<FormLabel>Name</FormLabel>
									<Input
										placeholder="Name of the product"
										type="text"
										value={name}
										onChange={(event) => setName(event.target.value)}
									/>
								</FormControl>
							</Box>
							<HStack>
								<FormControl id="brand" isRequired>
									<FormLabel>Brand</FormLabel>
									<Input
										placeholder="Brand"
										type="text"
										value={brand}
										onChange={(event) => setBrand(event.target.value)}
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel>Quantity</FormLabel>
									<NumberInput
										min={1}
										max={20}
										value={quantity}
										onChange={(val) => setQuantity(val)}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
							</HStack>
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
									Add to catalogue
								</Button>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</form>
		</Center>
	);
}
