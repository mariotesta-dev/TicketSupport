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
	Flex,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { managersAPI, ticketsAPI } from "../api/API";
import toast from "react-hot-toast";
import Select from "react-select";

function TicketsTableExpertField({ ticket }) {
	const [experts, setExperts] = useState([]);
	const [selectedExpert, setSelectedExpert] = useState(
		ticket.assignedTo != null
			? {
					label: ticket.assignedTo.name + " " + ticket.assignedTo.surname,
					value: ticket.assignedTo,
			  }
			: null
	);
	const [priority, setPriority] = useState(
		ticket.priority ? { label: ticket.priority, value: ticket.priority } : null
	);

	const priorityOptions = [
		{ label: "Low", value: "LOW" },
		{ label: "Medium", value: "MEDIUM" },
		{ label: "High", value: "HIGH" },
	];

	useEffect(() => {
		const handleGetExperts = async () => {
			try {
				const res = await managersAPI.getAllExpertsByExpertise(ticket.category);
				setExperts(
					res.map((expert) => ({
						label: expert.name + " " + expert.surname,
						value: expert,
					}))
				);
			} catch (error) {
				toast.error("Unable to get experts");
			}
		};
		handleGetExperts();
	}, [ticket]);

	const handleExpertSelect = (e) => {
		setSelectedExpert(e.value);
	};

	const handlePriorityTypeSelect = (e) => {
		setPriority(e.value);
	};

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleCloseModal = () => {
		setSelectedExpert(null); // Reset the selectedExpert state to null when the modal is closed
		onClose();
	};

	const assignExpert = () => {
		try {
			managersAPI.assignTicketToExpert(ticket.id, selectedExpert.id, priority);
			toast.success("Expert assigned successfully");
			ticket.assignedTo = selectedExpert;
			ticket.priority = priority;
		} catch (error) {
			toast.error("Unable to assign expert");
		}
		onClose();
	};

	return (
		<>
			<Button variant={"outline"} fontWeight={"normal"} onClick={onOpen}>
				{ticket.assignedTo != null
					? ticket.assignedTo.name + " " + ticket.assignedTo.surname
					: "unassigned"}
			</Button>

			<Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex flexDirection={"column"} gap={3}>
							<Select
								placeholder="Search for an expert..."
								options={experts}
								onChange={handleExpertSelect}
								label="Single select"
							/>
							<Select
								placeholder="Choose a priority..."
								options={priorityOptions}
								onChange={handlePriorityTypeSelect}
							/>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={assignExpert}>
							Assign
						</Button>
						<Button onClick={onClose} variant="ghost">
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default TicketsTableExpertField;
