import { HamburgerIcon } from "@chakra-ui/icons";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	Stack,
	Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ticketsAPI } from "../api/API";
import { HistoryBlock } from "./history/History";

export default function Evaluation({ expert }) {
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const btnRef = useRef();

	return (
		<>
			<Button
				leftIcon={<HamburgerIcon />}
				size={"sm"}
				colorScheme="gray"
				onClick={() => setIsOpen(true)}
				ref={btnRef}>
				Evaluation
			</Button>
			<EvaluationDrawer
				expert={expert}
				isOpen={isOpen}
				onClose={onClose}
				btnRef={btnRef}
			/>
		</>
	);
}

function EvaluationDrawer({ expert, isOpen, onClose, btnRef }) {
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		const groupById = async (initialArray) => {
			const groupedMap = new Map();
			for (const e of initialArray) {
				if (!groupedMap.has(e.ticket.id)) {
					groupedMap.set(e.ticket.id, []);
				}
				groupedMap.get(e.ticket.id).push({
					status: e.status,
					updatedAt: e.updatedAt,
					product: e.ticket.product,
					summary: e.ticket.summary,
					description: e.ticket.description,
				});
			}
			return Array.from(groupedMap.entries()).map((el) => {
				return { id: el[0], ticket: el[1] };
			});
		};
		const handleGetHistoryForEvaluation = async () => {
			try {
				const data = await ticketsAPI.getHistoryForEvaluation(expert.id);
				const groupedData = await groupById(data);
				setTickets(groupedData);
			} catch (error) {
				toast.error(error.detail);
			}
		};

		if (isOpen) {
			handleGetHistoryForEvaluation(expert.id);
		}
	}, [isOpen, expert.id]);

	return (
		<Drawer
			size={"lg"}
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader>
					<Flex direction={"column"}>
						<Flex
							direction={"row"}
							justifyContent={"space-between"}
							alignItems={"center"}>
							<Flex direction={"row"} gap={2}>
								<Text>{expert.name + " " + expert.surname}</Text>
							</Flex>
							<DrawerCloseButton position={"relative"} top={0} />
						</Flex>
						<Stack>
							<Text fontSize={"sm"} color={"gray.500"}>
								Category: {expert.expertise}
							</Text>
						</Stack>
					</Flex>
				</DrawerHeader>
				<Divider />

				<DrawerBody px={10} py={6}>
					<Text fontSize={"sm"} color={"gray.500"} textAlign={"center"} mb={6}>
						{tickets.length > 0
							? `List of tickets assigned to ${expert.name}`
							: "No tickets assigned."}
					</Text>
					<Stack gap={8}>
						{tickets &&
							tickets.map((ticket, key) => (
								<TicketEvaluation ticket={ticket} key={key} />
							))}
					</Stack>
				</DrawerBody>
				<Divider />
				<DrawerFooter>
					<Flex direction={"row"} gap={1} width={"full"}></Flex>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function TicketEvaluation({ ticket }) {
	return (
		<Stack p={6} bg={"gray.50"} rounded={"xl"}>
			<HStack justifyContent={"space-between"}>
				<Stack>
					<Text fontWeight={"semibold"}>
						<Text
							as="span"
							fontSize={"sm"}
							fontWeight={"normal"}
							color={"gray.500"}>
							Summary:
						</Text>{" "}
						{ticket.ticket[0].summary}
					</Text>
					<Text mt={"-2"} mb={"2"}>
						<Text as="span" fontSize={"sm"} color={"gray.500"}>
							Description:
						</Text>{" "}
						{ticket.ticket[0].description}
					</Text>
				</Stack>
				<Stack>
					<Text fontSize={"sm"} color={"gray.500"} maxW={"100px"} isTruncated>
						{ticket.ticket[0].product.name}
					</Text>
					<Text mt={"-2"} mb={"2"} fontSize={"sm"} color={"gray.500"}>
						{ticket.ticket[0].product.ean}
					</Text>
				</Stack>
			</HStack>
			<Accordion allowMultiple>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box as="span" flex="1" textAlign="left" fontWeight={"bold"}>
								Status History
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<HistoryBlock
							history={ticket.ticket.map((h) => {
								console.log(h);
								return {
									type: "status",
									object: { status: h.status, updatedAt: h.updatedAt },
								};
							})}
						/>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Stack>
	);
}
/**
 * {tickets &&
						tickets.values().map((ticket) => {
							return ticket.map((status) => <Status status={status.status} />);
						})}
 */
