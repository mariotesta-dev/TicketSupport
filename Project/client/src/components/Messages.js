import React, { useEffect, useRef, useState } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { getDecodedJwtToken, getUserRole } from "../utils/SessionUtils";
import { ticketsAPI } from "../api/API";
import { toast } from "react-hot-toast";

const Messages = ({ ticket }) => {
	const me = getUserRole();

	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const handleGetMessages = async () => {
			try {
				const res = await ticketsAPI.getMessages(ticket.id);
				setMessages(res);
			} catch (error) {
				toast.error("Unable to get user");
			}
			setLoading(false);
		};

		const interval = setInterval(() => {
			handleGetMessages();
		}, 3000);

		return () => clearInterval(interval);
	}, [ticket.id]);

	const AlwaysScrollToBottom = () => {
		const elementRef = useRef();
		useEffect(() => elementRef.current.scrollIntoView());
		return <div ref={elementRef} />;
	};

	return (
		<>
			{loading ? (
				<Flex
					w={"full"}
					h={"full"}
					overflowY="auto"
					flexDirection="column"
					p={3}
					bg={"white"}>
					<DescriptionMessage ticket={ticket} />
					{messages.map((item, index) => {
						if (item.sentBy === me) {
							return <SenderMessage item={item} key={index} />;
						} else {
							return <ReceiverMessage item={item} key={index} />;
						}
					})}
					<AlwaysScrollToBottom />
				</Flex>
			) : (
				""
			)}
		</>
	);
};

function DescriptionMessage({ ticket }) {
	// Duplicated of SenderMessage if we want to customize this further more

	const item = { text: ticket.description, sender: getDecodedJwtToken().name };

	return (
		<Flex w="100%" justify="flex-end" alignItems={"center"} gap={2}>
			<Flex
				rounded={"xl"}
				bg="blue.300"
				color="white"
				minW="100px"
				maxW="350px"
				my="1"
				p="3">
				<Text>{item.text}</Text>
			</Flex>
			<Avatar name={item.sender} size={"sm"}></Avatar>
		</Flex>
	);
}

function SenderMessage({ item }) {
	return (
		<Flex w="100%" justify="flex-end" alignItems={"center"} gap={2}>
			<Flex direction={"column"} alignItems={"flex-end"}>
				<Flex
					rounded={"xl"}
					bg="blue.300"
					color="white"
					minW="100px"
					maxW="350px"
					my="1"
					p="3">
					<Text>{item.text}</Text>
				</Flex>
				<Text fontSize={"xs"} color={"gray.500"}>
					now
				</Text>
			</Flex>
			<Avatar name={item.sender} size={"sm"}></Avatar>
		</Flex>
	);
}

function ReceiverMessage({ item }) {
	return (
		<Flex w="100%" gap={2} alignItems={"center"}>
			<Avatar name={item.sender} size={"sm"}></Avatar>
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
					now
				</Text>
			</Flex>
		</Flex>
	);
}

export default Messages;
