import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Text,
	HStack,
	Flex,
	Tooltip,
} from "@chakra-ui/react";

import { ticketsAPI } from "../../api/API";
import toast from "react-hot-toast";
import { useState } from "react";
import { Status } from "../Status";

import Select, { components } from "react-select";

function ChangeStatusModal({ ticket }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedStatus, setSelectedStatus] = useState(ticket.status.status);
	const [isOperationAllowed, setIsOperationAllowed] = useState(false);
	const [message, setMessage] = useState("");

	const Control = ({ children, ...props }) => (
		<components.Control {...props}>{children}</components.Control>
	);

	function pickColor(status) {
		switch (status) {
			case "OPEN":
				return "#4488cc";
			case "IN_PROGRESS":
				return "#dca63e";
			case "CLOSED":
				return "red";
			case "RESOLVED":
				return "green";
			case "REOPENED":
				return "#845cd4";
			default:
				return "white";
		}
	}

	const customStyles = {
		singleValue: (base) => ({
			...base,
			padding: "5px 10px",
			borderRadius: 5,
			background: pickColor(selectedStatus),
			color: "white",
			fontWeight: "bold",
			display: "flex",
			width: "fit-content",
		}),
	};

	const statusOptions = [
		{ value: "OPEN", label: "OPEN" },
		{ value: "IN_PROGRESS", label: "IN PROGRESS" },
		{ value: "CLOSED", label: "CLOSED" },
		{ value: "RESOLVED", label: "RESOLVED" },
		{ value: "REOPENED", label: "REOPENED" },
	];

	const statesGraph = {
		OPEN: ["CLOSED", "IN_PROGRESS", "RESOLVED"],
		CLOSED: ["REOPENED"],
		RESOLVED: ["REOPENED", "CLOSED"],
		IN_PROGRESS: ["OPEN", "CLOSED", "RESOLVED"],
		REOPENED: ["CLOSED", "RESOLVED", "IN_PROGRESS"],
	};

	function isValidTransition(start, end) {
		return statesGraph[start].includes(end) || false;
	}

	const handleChange = (selectedOption) => {
		if (isValidTransition(ticket.status.status, selectedOption.label)) {
			setIsOperationAllowed(true);
			setMessage("");
		} else {
			setIsOperationAllowed(false);
			setMessage(
				`Can't change from ${ticket.status.status.replace("_", " ")} to ${
					selectedOption.label
				}`
			);
		}
		setSelectedStatus(selectedOption.value);
	};

	const formatForUrl = (status) => {
		switch (status) {
			case "OPEN":
				return "open";
			case "IN PROGRESS":
				return "in_progress";
			case "CLOSED":
				return "close";
			case "RESOLVED":
				return "resolve";
			case "REOPENED":
				return "reopen";
			default:
				return "open";
		}
	};

	const handleClick = async () => {
		try {
			await ticketsAPI.changeTicketStatus(
				ticket.id,
				formatForUrl(selectedStatus)
			);
			toast.success("Ticket status changed successfully!");
			window.location.reload();
		} catch (error) {
			toast.error(error.detail);
		}
	};

	return (
		<>
			<Button onClick={onOpen} variant={"outline"}>
				<Status status={ticket.status.status || "OPEN"} />
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Assign a new status</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex flexDirection={"column"} gap={3}>
							<HStack>
								<Text fontWeight={"bold"}>Current status:</Text>
								<Status status={ticket.status.status || "OPEN"} />
							</HStack>
							<Select
								onChange={handleChange}
								options={statusOptions}
								styles={customStyles}
								components={{ Control }}
							/>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Tooltip
							p={3}
							rounded={"xl"}
							textAlign={"center"}
							hasArrow
							bg="red.100"
							color="black"
							isDisabled={isOperationAllowed}
							label={message}
							placement="top">
							<Button
								isDisabled={!isOperationAllowed}
								onClick={handleClick}
								colorScheme="green"
								mr={3}>
								Assign
							</Button>
						</Tooltip>
						<Button variant="ghost" onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default ChangeStatusModal;
