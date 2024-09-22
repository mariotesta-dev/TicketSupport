import {
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useSteps,
	Box,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { ticketsAPI } from "../api/API";
import toast from "react-hot-toast";

const steps = [
	{ title: "First", description: "Contact Info" },
	{ title: "Second", description: "Date & Time" },
	{ title: "Third", description: "Select Rooms" },
];

export default function History({ ticketId }) {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const getHistory = async () => {
			try {
				const response = await ticketsAPI.getTicketHistory(ticketId);
				setHistory(response);
			} catch (error) {
				toast.error(error.details);
			}
		};
		getHistory();
	}, []);

	return (
		<Stepper orientation="vertical" height="400px" gap="0">
			{steps.map((step, index) => (
				<Step key={index}>
					<StepIndicator>
						<StepStatus
							complete={<StepIcon />}
							incomplete={<StepNumber />}
							active={<StepNumber />}
						/>
					</StepIndicator>

					<Box flexShrink="0">
						<StepTitle>{step.title}</StepTitle>
						<StepDescription>{step.description}</StepDescription>
					</Box>

					<StepSeparator />
				</Step>
			))}
		</Stepper>
	);
}
