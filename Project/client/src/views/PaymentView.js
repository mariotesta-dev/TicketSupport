import React, { useEffect } from "react";
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
	Select,
	Center,
	Card,
	CardBody,
	Divider,
	VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { CalendarIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Backbutton from "../components/Backbutton";
import { authAPI, warrantiesAPI } from "../api/API";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import * as session from '../utils/SessionUtils.js'; 	
import { useLocation } from "react-router-dom";	
import * as converters from "../utils/converters";
import { useOutletContext } from "react-router-dom";

function PaymentView() {

	const [user, setUser] = useOutletContext();
	const [newExpiringRange, setNewExpiringRange] = useState("");

	const [loading, setLoading] = useState(false);
	const [cardExpiringMonth , setCardExpiringMonth] = useState("");
	const [cardExpiringYear, setCardExpiringYear] = useState("");
	const [address, setAddress] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [creditCardNumber, setCreditCardNumber] = useState("");
	const [nameOnCard, setNameOnCard] = useState("");

	const location = useLocation();
	const product = location.state && location.state.product;
	const dateOfPurchase = location.state && location.state.dateOfPurchase;
	const endOfWarranty = location.state && location.state.endOfWarranty;

	const getCurrentYear = () => new Date().getFullYear();

	const getYearsArray = () => {
		const currentYear = getCurrentYear();
		const years = [];

		for (let i = 0; i < 21; i++) {
		years.push(currentYear + i);
		}

		return years;
	};

	const handleSubmit = async () => {
		setLoading(true);

		const newDate = converters.addMonthsOrYears(endOfWarranty, newExpiringRange);
		
		try {
			/* Here there should be a POST request for the actual payment, but we skip this step */
			const response = await warrantiesAPI.extendWarranty(product.ean, newDate);
			if (response.status === 200) {
				toast.success("Payment successful");
				setLoading(false);
			}
		} catch (error) {
			toast.error("Payment failed");
			setLoading(false);
		}
	};

	const yearsArray = getYearsArray();

	return (
		<Center my={200} height={"full"} width={"full"} bg={"gray.50"}>
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
						Payment
					</Heading>
				</Center>
					<Stack spacing={4}>
						<ProductSummary product={product} dateOfPurchase={dateOfPurchase} endOfWarranty={endOfWarranty}/>
						<FormControl>
							<FormLabel color={'blue.500'}>How much do you want to extend the current warranty?</FormLabel>
							<Select placeholder='Month' onChange={(event) => setNewExpiringRange(event.target.value)} value={newExpiringRange}>
								<option>3 Months</option>
								<option>6 Months</option>
								<option>1 Year</option>
								<option>2 Years</option>
								<option>3 Years</option>
							</Select>
						</FormControl>
						<Divider my={5}/>
						<FormControl id="address" isRequired>
							<FormLabel>Street address</FormLabel>
							<Input
								type="address"
								placeholder="1234 Malnati St"
								value={address}
								onChange={(event) => setAddress(event.target.value)}
							/>
						</FormControl>
						<HStack>
							<Box>
								<FormControl id="zipcode" isRequired>
									<FormLabel>Zip Code</FormLabel>
									<Input
										type="text"
										placeholder="12345"
										value={zipCode}
										onChange={(event) => setZipCode(event.target.value)}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="city">
									<FormLabel>City</FormLabel>
									<Input
										type="text"
										placeholder="Berlin"
										value={city}
										onChange={(event) => setCity(event.target.value)}
									/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl id="email" isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
							/>
						</FormControl>
						<HStack>
							<Box>
								<FormControl id="creditCardNumber" isRequired>
									<FormLabel>Credit card number</FormLabel>
									<Input
										type="text"
										placeholder="4320-1234-5678-9012"
										value={creditCardNumber}
										onChange={(event) => setCreditCardNumber(event.target.value)}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl>
									<FormLabel color={'blue.500'}>Card expiration date</FormLabel>
									<Select placeholder='Month' onChange={(event) => setCardExpiringMonth(event.target.value)} value={cardExpiringMonth}>
										<option>01</option>
										<option>02</option>
										<option>03</option>
										<option>04</option>
										<option>05</option>
										<option>06</option>
										<option>07</option>
										<option>08</option>
										<option>09</option>
										<option>10</option>
										<option>11</option>
										<option>12</option>
									</Select>
								</FormControl>
							</Box>
							<Box>
							<FormControl mt={8}>
									<FormLabel></FormLabel>
									<Select placeholder='Year' onChange={(event) => setCardExpiringYear(event.target.value)} value={cardExpiringYear}>
										{yearsArray.map((year) => 
											<option>{year}</option>
										)}
									</Select>
								</FormControl>
							</Box>
						</HStack>
						<FormControl id="nameOnCard">
							<FormLabel>Name on card</FormLabel>
							<Input
								type="text"
								placeholder="John Doe"
								value={nameOnCard}
								onChange={(event) => setNameOnCard(event.target.value)}
							/>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Submitting"
								onClick={handleSubmit}
								size="lg"
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								isLoading={loading}>
								Pay
							</Button>
						</Stack>
					</Stack>
			</Stack>
		</Center>
	);
}

function ProductSummary({product, dateOfPurchase, endOfWarranty}) {
	return(
		<Card>
 		 	<CardBody>
				<VStack my={4} spacing={5}>
					<Text mx={2} fontSize={"lg"} fontWeight={"bold"}>Product</Text>
					<Text>{product.name ? product.name : product.product.name}</Text>
				</VStack>

				<VStack my={4} spacing={5}>
				<Text fontSize={"lg"} fontWeight={"bold"}>Date of Purchase</Text>
				<HStack>
				<CalendarIcon/> <Text>{dateOfPurchase}</Text>
				</HStack>
				</VStack>

				<VStack my={4} spacing={5}>
				<Text fontSize={"lg"} fontWeight={"bold"}>Current end of warranty</Text>
				<HStack>
				<CalendarIcon color={'red.500'}/><Text color={'red.500'}>{endOfWarranty}</Text>
				</HStack>
				</VStack>

			</CardBody>
		</Card>
	)
}

export default PaymentView;