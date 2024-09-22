import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Icon,
	Input,
	FormControl,
	FormLabel,
	HStack,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { warrantiesAPI } from "../api/API";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function AddPurchase({ product }) {
	const {
		isOpen: isPurchaseModalOpen,
		onOpen: onPurchaseModalOpen,
		onClose: onPurchaseModalClose,
	} = useDisclosure();

	return (
		<>
			<Button
				onClick={onPurchaseModalOpen}
				variant={"ghost"}
				size={"sm"}
				colorScheme="blue"
				leftIcon={<Icon as={FaShoppingCart} boxSize={4} />}>
				Add Purchase
			</Button>
			<AddPurchaseModal
				isOpen={isPurchaseModalOpen}
				onOpen={onPurchaseModalClose}
				onClose={onPurchaseModalClose}
				product={product}
			/>
		</>
	);
}

export function AddPurchaseModal({ isOpen, onOpen, onClose, product }) {
	const [ean, setEan] = useState(product ? product.ean : "");

	const now = new Date();
	const [dateOfPurchase, setDateOfPurchase] = useState(now);
	//end of warranty is today + 2 years
	const [endOfWarranty, setEndOfWarranty] = useState(
		new Date(now.getFullYear() + 2, now.getMonth(), now.getDate())
	);
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const handleCreatePurchase = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await warrantiesAPI.createWarranty({
				product: {
					ean: ean,
				},
				dateOfPurchase: dayjs(dateOfPurchase).format("YYYY-MM-DD"),
				endOfWarranty: dayjs(endOfWarranty).format("YYYY-MM-DD"),
			});

			toast.success("Purchase created");

			setInterval(() => {
				navigate("/dashboard/products");
				navigate(0); //to force refresh
			}, 500);
		} catch (error) {
			toast.error(error.detail);
		}
		setLoading(false);
	};

	useEffect(() => {
		setEndOfWarranty(
			new Date(
				dateOfPurchase.getFullYear() + 2,
				dateOfPurchase.getMonth(),
				dateOfPurchase.getDate()
			)
		);
	}, [dateOfPurchase]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody>
					<form onSubmit={handleCreatePurchase}>
						<Stack spacing={8} px={6} pt={6}>
							<Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
								Add purchase
							</Text>
							<FormControl id="ean" isRequired>
								<FormLabel>Product EAN</FormLabel>
								<Input
									variant={product ? "filled" : "outline"}
									placeholder="Product EAN"
									value={ean}
									onChange={(e) => setEan(e.target.value)}
									disabled={product}
								/>
							</FormControl>

							<HStack>
								<FormControl id="date_of_purchase" isRequired>
									<FormLabel>Date of purchase</FormLabel>
									<Input
										placeholder="Select Date"
										size="md"
										type="date"
										value={dateOfPurchase.toISOString().split("T")[0]}
										onChange={(e) =>
											setDateOfPurchase(new Date(e.target.value))
										}
										max={now.toISOString().split("T")[0]}
									/>
								</FormControl>
								<FormControl>
									<FormLabel>End of warranty</FormLabel>
									<Input
										placeholder="Select Date"
										size="md"
										type="date"
										value={endOfWarranty.toISOString().split("T")[0]}
										disabled
									/>
								</FormControl>
							</HStack>
							<Stack spacing={2} pt={2}>
								<Button
									type="submit"
									isLoading={loading}
									size="lg"
									bg={"blue.400"}
									color={"white"}
									_hover={{
										bg: "blue.500",
									}}>
									Confirm
								</Button>
								<Text textAlign="center" fontSize={"sm"} color={"gray.500"}>
									By confirming a purchase for this product, you will generate a
									2 years warranty.
								</Text>
							</Stack>
						</Stack>
					</form>
				</ModalBody>

				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
}
