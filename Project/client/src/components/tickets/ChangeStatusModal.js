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
    Tag
} from "@chakra-ui/react";

import { ticketsAPI } from "../../api/API";
import toast from "react-hot-toast";
import { useState } from "react";
import { Status } from "../Status";

import Select, { components } from "react-select";

function ChangeStatusModal({ ticket, type }) {
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
				return "#3484cc";
			case "IN_PROGRESS":
				return "#dca63e";
			case "CLOSED":
				return "red";
			case "RESOLVED":
				return "#38a169";
			case "REOPENED":
				return "#845cd4";
            case "HIGH":
                return "red";
            case "MEDIUM":
                return "#dca63e";
            case "LOW":
                return "#38a169";
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

    const priorityOptions = [
        { value: "HIGH", label: "HIGH" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "LOW", label: "LOW" },
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
        if(type === "status") {
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
        }
        else {
            if(selectedOption.label === ticket.priority) {
                setIsOperationAllowed(false);
                setMessage("Can't change to the same priority");
            }
            else {
                setIsOperationAllowed(true);
                setMessage("");
            }
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
				return status.toLowerCase();
		}
	};

	const handleClick = async () => {
		try {
            if (type === "status") {
                await ticketsAPI.changeTicketStatus(
                    ticket.id,
                    formatForUrl(selectedStatus)
                );
            }
            else {
                await ticketsAPI.changeTicketPriority(
                    ticket.id,
                    formatForUrl(selectedStatus)
                );
            }
			toast.success(`Ticket ${type} changed successfully!`);
			window.location.reload();
		} catch (error) {
			toast.error(error.detail);
		}
	};

	return (
		<>
			<Button onClick={onOpen} variant={"outline"}>
                {type === "priority" && ticket.priority !== null ? (
                    <Status status={ticket.priority} />
                ) : type === "status" ? (
                    <Status status={ticket.status.status || "OPEN"} />
                ) : type==="priority" && !ticket.priority ? (
                    "-"
                ) : ("aaa")}
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Assign a new status</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex flexDirection={"column"} gap={3}>
							<HStack>
								<Text fontWeight={"bold"}>Current {type}:</Text>
								{type==="status" ? (<Status status={ticket.status.status || "OPEN"} />) : (<Status status={ticket.priority}/>)}
							</HStack>
							<Select
								onChange={handleChange}
								options={type==="status" ? statusOptions : priorityOptions}
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
