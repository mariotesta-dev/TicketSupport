import {
	Box,
	Button,
	DrawerBody,
	Divider,
	Drawer,
	Text,
	Flex,
	DrawerHeader,
	DrawerContent,
	DrawerOverlay,
	Stack,
	DrawerCloseButton,
	Avatar,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";
import { ticketsAPI } from "../../api/API";

import toast from "react-hot-toast";
import { TimeIcon } from "@chakra-ui/icons";
import { Status } from "../Status";
import * as converters from "../../utils/converters";

export default function History({ ticket }) {
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const btnRef = useRef();

	return (
		<>
			<Button
				leftIcon={<TimeIcon />}
				ref={btnRef}
				size={"sm"}
				colorScheme="gray"
				onClick={() => setIsOpen(true)}>
				History
			</Button>

			<HistoryDrawer
				ticket={ticket}
				isOpen={isOpen}
				onClose={onClose}
				btnRef={btnRef}
			/>
		</>
	);
}

function HistoryDrawer({ ticket, isOpen, onClose, btnRef }) {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const getHistory = async () => {
			try {
				const response = await ticketsAPI.getTicketHistory(ticket.id);
				setHistory(response);
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		};
		getHistory();
	}, [ticket.id]);

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
					History
					<Flex direction={"column"}>
						<DrawerCloseButton />
						<Stack pt={1}>
							<Text fontSize={"sm"} color={"gray.500"}>
								Description:{" "}
								<Text
									as={"span"}
									fontWeight={"normal"}
									wordBreak={"break-word"}>
									{ticket.description}
								</Text>
							</Text>
							<Text fontSize={"sm"} color={"gray.500"}>
								Product:{" "}
								<Text as={"span"} fontWeight={"normal"}>
									{ticket.product.name}
								</Text>
							</Text>
						</Stack>
					</Flex>
				</DrawerHeader>
				<Divider />

				<DrawerBody p={10}>
					<HistoryBlock history={history} />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

export function HistoryBlock({ history }) {
	return (
		<Flex
			height="full"
			gap="2"
			w={"full"}
			direction={"column"}
			alignItems={"center"}>
			{history.map((step, index) =>
				step.type === "status" ? (
					<Flex
						w={"full"}
						direction={"column"}
						alignItems={"center"}
						key={index}>
						{index > 0 && (
							<Box w={"1px"} h={"30px"} bg={"gray.400"} mb={"5px"} />
						)}
						<Flex
							gap={2}
							h={"fit-content"}
							direction={"column"}
							alignItems={"center"}>
							<Status status={step.object.status} />
							<Text fontSize={"xs"} color={"gray.500"}>
								{converters.formatDateTime(step.object.updatedAt)}
							</Text>
						</Flex>
						{index > 0 &&
							index !== history.length - 1 &&
							history[index + 1].type !== "status" && (
								<Box w={"1px"} h={"30px"} bg={"gray.400"} mt={"5px"} />
							)}
					</Flex>
				) : (
					<Flex
						w={"full"}
						direction={"column"}
						alignItems={"center"}
						key={index}>
						<Message message={step.object} />
					</Flex>
				)
			)}
		</Flex>
	);
}

function Message({ message }) {
	return (
		<Flex
			w="100%"
			direction={message.sentBy === "customer" ? "row" : "row-reverse"}
			justifyContent={message.sentBy === "customer" ? "flex-end" : "flex-end"}
			alignItems={"center"}
			gap={2}>
			<Flex
				direction="column"
				h={"fit-content"}
				alignItems={message.sentBy === "customer" ? "flex-end" : "flex-start"}>
				<Flex
					rounded={"xl"}
					bg={message.sentBy === "customer" ? "blue.300" : "gray.100"}
					color={message.sentBy === "customer" ? "white" : "black"}
					minW="100px"
					maxW="350px"
					my="1"
					p="3">
					<Text>{message.text}</Text>
				</Flex>
				<Text fontSize={"xs"} color={"gray.500"} px={"10px"}>
					{converters.formatDateTime(message.sentAt)}
				</Text>
			</Flex>
			<Avatar
				size={"sm"}
				name={message.sentBy === "customer" ? message.customer : message.expert}
			/>
		</Flex>
	);
}
