import React from "react";
import {
	FormControl,
	Stack,
	Button,
	Heading,
	useColorModeValue,
	Center,
	PinInput,
	PinInputField,
	Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Backbutton from "../components/Backbutton";
import { warrantiesAPI } from "../api/API";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
	// This is already wrapped in protected route, do we need also this?
	// if (session.getJwtToken()) {
	// 	return <Navigate to="/dashboard" replace />;
	// }
	return <NewProductCard />;
}

function NewProductCard() {
	const [user] = useOutletContext();
	const [loading, setLoading] = useState(false);

	const [ean, setEan] = useState("");

	const navigate = useNavigate();

	const handleSubscribeProduct = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			// TODO: We need a way to get warrantyId from the EAN!!!

			if (ean.replace(/\s/g, "").length !== 13) {
				const error = { detail: "Invalid EAN" };
				throw error;
			}

			await warrantiesAPI.subscribeProduct(ean, user.id);
			toast.success("Product added successfully");

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
		<Center height={"full"} width={"full"} bg={"gray.50"}>
			<Backbutton href="/dashboard/products" />
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
						Add a new product
					</Heading>
				</Center>
				<Center
					fontSize={{ base: "sm", sm: "md" }}
					color={useColorModeValue("gray.800", "gray.400")}>
					Insert the verification code you've received upon purchase to activate
					your warranty.
				</Center>

				<FormControl>
					<Center>
						<Flex gap={2} flexWrap={"wrap"} justifyContent={"center"}>
							<PinInput value={ean} onChange={(val) => setEan(val)}>
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
							</PinInput>
						</Flex>
					</Center>
				</FormControl>
				<Stack spacing={6}>
					<Button
						isLoading={loading}
						bg={"blue.400"}
						color={"white"}
						_hover={{
							bg: "blue.500",
						}}
						onClick={() => handleSubscribeProduct()}>
						Verify
					</Button>
				</Stack>
			</Stack>
		</Center>
	);
}
