import React, { useEffect, useRef, useState } from "react";
import { Avatar, Center, CircularProgress, Flex, Text } from "@chakra-ui/react";
import { getDecodedJwtToken, getUserRole, isCustomer, isExpert } from "../utils/SessionUtils";
import { ticketsAPI } from "../api/API";
import { toast } from "react-hot-toast";
import * as converters from "../utils/converters";

const Messages = ({ ticket, newMessageSent, setNewMessageSent }) => {
	const me = getUserRole().toLowerCase();

	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);

	console.log(messages);

	useEffect(() => {
		const handleGetMessages = async () => {
			try {
				const res = await ticketsAPI.getMessages(ticket.id);
				setMessages(res);
			} catch (error) {
				toast.error("Unable to retrieve the messages");
			}
		};

		handleGetMessages();
		setLoading(false);

		const interval = setInterval(() => {
			handleGetMessages();
		}, 10000);

		return () => clearInterval(interval);
	}, [ticket.id]);

	useEffect(() => {
		const handleGetMessages = async () => {
			try {
				const res = await ticketsAPI.getMessages(ticket.id);
				setMessages(res);
			} catch (error) {
				toast.error("Unable to retrieve the messages");
			}
		};

		if (newMessageSent) {
			handleGetMessages();
			setNewMessageSent(false);
		}
	}, [newMessageSent, setNewMessageSent, ticket.id]);

	const ScrollToBottom = () => {
		const elementRef = useRef();
		useEffect(() => elementRef.current.scrollIntoView());
		return <div ref={elementRef} />;
	};

	return (
		<>
			{!loading ? (
				<Flex
					w={"full"}
					h={"full"}
					overflowY="auto"
					flexDirection="column"
					p={6}
					bg={"white"}>
					<DescriptionMessage ticket={ticket} />
					{messages.map((item, index) => {
						if (item.sentBy === me) {
							return <SenderMessage item={item} key={index} me={me} />;
						} else {
							return <ReceiverMessage item={item} key={index} me={me} />;
						}
					})}
					<ScrollToBottom />
				</Flex>
			) : (
				<Center h={"full"} w={"full"}>
					<CircularProgress
						isIndeterminate
						color="blue.400"
						thickness="4px"
						size="50px"
					/>
				</Center>
			)}
		</>
	);
};

function DescriptionMessage({ ticket }) {
	// Duplicated of Message if we want to customize this further more

	const sender = isCustomer() ? getDecodedJwtToken().name : `${ticket.customer.name} ${ticket.customer.surname}`
	const item = { text: ticket.description, sender: sender };


	return (
		<Flex w="100%" gap={2} alignItems={"center"} justify={isCustomer() ? "flex-end" : "flex-start"}>
			{isExpert() && <Avatar name={item.sender} size={"sm"}></Avatar>}
			<Flex direction={"column"} alignItems={isCustomer() ? "flex-end" : "flex-start"}>
				<Flex
					rounded={"xl"}
					bg={isExpert() ? "gray.100" : "blue.300"}
					color={isExpert() ? "black" : "white"}
					minW="100px"
					maxW="350px"
					my="1"
					p="3">
					<Text>{item.text}</Text>
				</Flex>
			</Flex>
			{isCustomer() && <Avatar name={item.sender} size={"sm"}></Avatar>}
		</Flex>
	);



}

function SenderMessage({ item, me }) {
	return (
		<Flex w="100%" justify="flex-end" alignItems={"center"} gap={2}>
			<Flex direction={"column"} alignItems={"flex-end"}>
				<Flex
					rounded={"xl"}
					bg="blue.300"
					color="white"
					minW="50px"
					maxW="350px"
					my="1"
					p="3">
					<Text wordBreak={"break-word"}>{item.text}</Text>
				</Flex>
				<Text fontSize={"xs"} color={"gray.500"}>
					{converters.formatDateTime(item.sentAt)}
				</Text>
			</Flex>
			<Avatar
				name={me === "customer" ? item.customer : item.expert}
				size={"sm"}></Avatar>
		</Flex>
	);
}

function ReceiverMessage({ item, me }) {
	return (
		<Flex w="100%" gap={2} alignItems={"center"}>
			<Avatar
				name={me === "customer" ? item.expert : item.customer}
				size={"sm"}></Avatar>
			<Flex direction={"column"} alignItems={"flex-start"}>
				<Flex
					rounded={"xl"}
					bg="gray.100"
					color="black"
					minW="100px"
					maxW="350px"
					my="1"
					p="3">
					<Text>{item.text}</Text>
				</Flex>
				<Text fontSize={"xs"} color={"gray.500"}>
					{converters.formatDateTime(item.sentAt)}
				</Text>
			</Flex>
		</Flex>
	);
}

export default Messages;
