import { Divider, Flex, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import Backbutton from "./Backbutton";

function Sidebar({ user, setTickets, filter, setFilter }) {
	const handleFilter = (filter) => {
		setFilter(filter);
		switch (filter) {
			case "All":
				setTickets(user.tickets);
				break;
			case "Unassigned":
				setTickets(user.tickets.filter((ticket) => ticket.assignedTo === null));
				break;
			default:
				// REMEMBER to format FILTER AND/OR STATUS so that they can match
				setTickets(
					user.tickets.filter((ticket) => ticket.history.status === filter)
				);
				break;
		}
	};

	return (
		<Flex
			direction={"column"}
			flexGrow={10}
			minWidth={"150px"}
			maxWidth={"400px"}
			height={"full"}
			bg={"gray.50"}
			position={"relative"}
			px={"30px"}
			py={"100px"}
			gap={5}>
			<Backbutton href={"/dashboard"} />
			{PRIMARY_ITEMS.map((item, key) => (
				<Link
					key={key}
					onClick={() => handleFilter(item.label)}
					color={filter === item.label ? "blue.500" : "gray.600"}
					href="#"
					fontWeight={filter === item.label ? "bold" : "normal"}>
					{item.label}
				</Link>
			))}
			<Divider />
			{SECONDARY_ITEMS.map((item, key) => (
				<Link
					key={key}
					onClick={() => handleFilter(item.label)}
					color={filter === item.label ? "blue.500" : "gray.600"}
					href="#"
					fontWeight={filter === item.label ? "bold" : "normal"}>
					{item.label}
				</Link>
			))}
			<Divider />
			{TERTIARY_ITEMS.map((item, key) => (
				<Link
					key={key}
					onClick={() => handleFilter(item.label)}
					color={filter === item.label ? "blue.500" : "gray.600"}
					href="#"
					fontWeight={filter === item.label ? "bold" : "normal"}>
					{item.label}
				</Link>
			))}
		</Flex>
	);
}

const PRIMARY_ITEMS = [
	{
		label: "All",
	},
];

const SECONDARY_ITEMS = [
	{
		label: "Unassigned",
	},
];

const TERTIARY_ITEMS = [
	{
		label: "Open",
	},
	{
		label: "In Progress",
	},
	{
		label: "Reopened",
	},
	{
		label: "Solved",
	},
	{
		label: "Closed",
	},
];

export default Sidebar;
