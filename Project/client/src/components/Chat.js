import { ArrowForwardIcon, ArrowUpIcon, ChatIcon } from "@chakra-ui/icons";
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
	Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Messages from "./Messages";

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
	return (
		<Drawer
			size={"lg"}
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Chat</DrawerHeader>
				<Divider />

				<DrawerBody>
					<Messages messages={messages} ticket={ticket} />
				</DrawerBody>
				<Divider />
				<DrawerFooter>
					<Flex direction={"row"} gap={1} width={"full"}>
						<Input placeholder="Type here..." />
						<Button colorScheme="blue" bg={"blue.400"}>
							<ArrowForwardIcon />
						</Button>
					</Flex>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export default Chat;
