import { ArrowForwardIcon, ChatIcon } from "@chakra-ui/icons";
import {
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
	Input,
	Stack,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Messages from "./Messages";
import { getUserRole } from "../utils/SessionUtils";
import { ticketsAPI } from "../api/API";
import { toast } from "react-hot-toast";
import { Status } from "./Status";

function Chat({ ticket }) {
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const btnRef = useRef();

	return (
		<>
			<Tooltip
				p={3}
				rounded={"xl"}
				textAlign={"center"}
				isDisabled={ticket.assignedTo}
				placement="auto-end"
				hasArrow
				label="Chat will be available once the ticket is assigned to a technician."
				bg="blue.100"
				color="black">
				<Button
					ref={btnRef}
					className={!ticket.assignedTo && "disabled-btn"}
					size={"sm"}
					colorScheme="blue"
					isDisabled={!ticket.assignedTo}
					onClick={() => setIsOpen(true)}>
					<ChatIcon />
				</Button>
			</Tooltip>
			<ChatDrawer
				ticket={ticket}
				isOpen={isOpen}
				onClose={onClose}
				btnRef={btnRef}
			/>
		</>
	);
}

function ChatDrawer({ ticket, isOpen, onClose, btnRef, messages }) {
	const [message, setMessage] = useState("");

	const [newMessageSent, setNewMessageSent] = useState(false);

	const handleSendMessage = async () => {
		try {
			await ticketsAPI.sendMessage({
				ticket: {
					id: ticket.id,
				},
				sentBy: getUserRole().toLowerCase(),
				text: message,
			});
			toast.success("Message sent successfully");
			setNewMessageSent(true);
			setMessage("");
		} catch (error) {
			toast.error("Unable to send the message");
		}
	};

	useEffect(() => {
		return () => {
			setMessage("");
		};
	}, [isOpen]);

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
								<Text>{ticket.summary}</Text>
								<Status status={ticket.status.status} />
							</Flex>
							<DrawerCloseButton position={"relative"} top={0} />
						</Flex>
						<Stack>
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

				<DrawerBody p={0}>
					<Messages
						ticket={ticket}
						newMessageSent={newMessageSent}
						setNewMessageSent={setNewMessageSent}
					/>
				</DrawerBody>
				<Divider />
				<DrawerFooter>
					<Flex direction={"row"} gap={1} width={"full"}>
						<Input
							placeholder="Type here..."
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>
						<Button
							isDisabled={message.replace(/\s/g, "").length === 0}
							colorScheme="blue"
							bg={"blue.400"}
							onClick={() => handleSendMessage()}>
							<ArrowForwardIcon />
						</Button>
					</Flex>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export default Chat;
