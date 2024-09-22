import React from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	HStack,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Select,
	Center,
	Card,
	CardBody,
	Divider,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { CalendarIcon } from "@chakra-ui/icons";
import Backbutton from "../components/Backbutton";
import { warrantiesAPI } from "../api/API";
import toast from "react-hot-toast";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as converters from "../utils/converters";
import dayjs from "dayjs";
//import { useOutletContext } from "react-router-dom";

function PaymentView() {
	const [user, setUser] = useOutletContext();
	const [newExpiringRange, setNewExpiringRange] = useState("");

	const [loading, setLoading] = useState(false);
	const [cardExpiringMonth, setCardExpiringMonth] = useState("");
	const [cardExpiringYear, setCardExpiringYear] = useState("");
	const [address, setAddress] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	//const [firstName, setFirstName] = useState("");
	//const [lastName, setLastName] = useState("");
	const [creditCardNumber, setCreditCardNumber] = useState("");
	const [nameOnCard, setNameOnCard] = useState("");

	const location = useLocation();
	const navigate = useNavigate();
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

		const newDate = converters.addMonthsOrYears(
			endOfWarranty,
			newExpiringRange
		);

		try {
			/* Here there should be a POST request for the actual payment, but we skip this step */

			if (newExpiringRange === "") {
				const error = { detail: "Please select a valid extension option" };
				throw error;
			}

			await warrantiesAPI.extendWarranty(product.ean, newDate);

			toast.success("Payment successful");
			setInterval(() => {
				navigate("/dashboard/products");
				navigate(0);
			}, 500);
		} catch (error) {
			toast.error(error.detail);
		}
		setLoading(false);
	};

	const yearsArray = getYearsArray();

	return (
		<Flex
			justifyContent={"center"}
			alignItems={"center"}
			height={"fit-content"}
			width={"full"}
			bg={"gray.50"}
			py={20}>
			<Backbutton href="/dashboard/products" />
			<Stack
				h={"full"}
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
						Extend Warranty
					</Heading>
				</Center>
				<Stack spacing={4}>
					<ProductSummary
						product={product}
						dateOfPurchase={dateOfPurchase}
						endOfWarranty={endOfWarranty}
					/>
					<FormControl>
						<FormLabel color={"blue.500"}>
							How much do you want to extend the current warranty?
						</FormLabel>
						<Select
							placeholder="Select"
							onChange={(event) => setNewExpiringRange(event.target.value)}
							value={newExpiringRange}>
							<option>6 Months - €19,99</option>
							<option>1 Year - €34,99</option>
							<option>2 Years - €49,99</option>
							<option>3 Years - €79,99</option>
						</Select>
					</FormControl>
					<Divider my={5} />
					<FormLabel color={"blue.500"}>Payment information</FormLabel>
					<FormControl id="address" isRequired>
						<FormLabel>Street address</FormLabel>
						<Input
							disabled
							type="address"
							placeholder="Corso Duca degli Abruzzi 24"
							value={address}
							onChange={(event) => setAddress(event.target.value)}
						/>
					</FormControl>
					<HStack>
						<Box>
							<FormControl id="zipcode" isRequired>
								<FormLabel>Zip Code</FormLabel>
								<Input
									disabled
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
									disabled
									type="text"
									placeholder="Turin"
									value={city}
									onChange={(event) => setCity(event.target.value)}
								/>
							</FormControl>
						</Box>
					</HStack>
					<FormControl id="email" isRequired>
						<FormLabel>Email address</FormLabel>
						<Input
							disabled
							type="email"
							placeholder={user.email}
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</FormControl>
					<HStack>
						<Box>
							<FormControl id="creditCardNumber" isRequired>
								<FormLabel>Credit card number</FormLabel>
								<Input
									disabled
									type="text"
									placeholder="4320-1234-5678-9012"
									value={creditCardNumber}
									onChange={(event) => setCreditCardNumber(event.target.value)}
								/>
							</FormControl>
						</Box>
						<Box>
							<FormControl>
								<FormLabel color={"blue.500"}>Card expiration date</FormLabel>
								<Select
									disabled
									placeholder="02"
									onChange={(event) =>
										setCardExpiringMonth(event.target.value) || ""
									}
									value={cardExpiringMonth}>
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
								<Select
									disabled
									placeholder="2027"
									onChange={(event) => setCardExpiringYear(event.target.value)}
									value={cardExpiringYear}>
									{yearsArray.map((year, key) => (
										<option key={key}>{year}</option>
									))}
								</Select>
							</FormControl>
						</Box>
					</HStack>
					<FormControl id="nameOnCard">
						<FormLabel>Name on card</FormLabel>
						<Input
							disabled
							type="text"
							placeholder={user.name + " " + user.surname}
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
							{newExpiringRange === ""
								? "Pay"
								: `Pay ${newExpiringRange.split(" ")[3]}`}
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Flex>
	);
}

function ProductSummary({ product, dateOfPurchase, endOfWarranty }) {
	return (
		<Card>
			<CardBody>
				<VStack my={4} spacing={5}>
					<Text mx={2} fontSize={"lg"} fontWeight={"bold"}>
						Product:{" "}
						<Text as={"span"} fontWeight={"normal"}>
							{product.name ? product.name : product.product.name}
						</Text>
					</Text>

					<Text fontSize={"lg"} fontWeight={"bold"}>
						Date of Purchase{" "}
						<HStack>
							<CalendarIcon />{" "}
							<Text as={"span"} fontWeight={"normal"}>
								{dayjs(dateOfPurchase).format("D MMM YYYY")}
							</Text>
						</HStack>
					</Text>

					<Text fontSize={"lg"} fontWeight={"bold"}>
						Current end of warranty{" "}
						<HStack w={"full"}>
							<Center w={"full"} gap={2}>
								<CalendarIcon color={"red.500"} />{" "}
								<Text as={"span"} color={"red.500"}>
									{dayjs(endOfWarranty).format("D MMM YYYY")}
								</Text>
							</Center>
						</HStack>
					</Text>
				</VStack>
			</CardBody>
		</Card>
	);
}

export default PaymentView;
