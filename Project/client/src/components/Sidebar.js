import { Divider, Flex, Link, Button } from "@chakra-ui/react";
import Backbutton from "./Backbutton";

function Sidebar({ user, tickets, setTickets, filter, setFilter }) {
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
					user.tickets.filter(
						(ticket) =>
							ticket.status.status === filter.replace(" ", "_").toUpperCase()
					)
				);
				break;
		}
	};

	const getTicketCountForCategory = (category) => {
		switch (category) {
		  case "All":
			return user.tickets.length;
		  case "Unassigned":
			return user.tickets.filter((ticket) => ticket.assignedTo === null).length;
		  default:
			return user.tickets.filter(
			  (ticket) => ticket.status.status === category.replace(" ", "_").toUpperCase()
			).length;
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
				<Flex>
				<Link
					key={key}
					onClick={() => handleFilter(item.label)}
					color={filter === item.label ? "blue.500" : "gray.600"}
					href="#"
					fontWeight={filter === item.label ? "bold" : "normal"}>
					{item.label}
				</Link>
				<Button
					mx={2}
					size={"xs"}
					key={key}
					variant={"outline"}>
					{getTicketCountForCategory(item.label)}
				</Button>
				</Flex>
			))}
			<Divider />
			{SECONDARY_ITEMS.map((item, key) => (
				<Flex>
				<Link
					key={key}
					onClick={() => handleFilter(item.label)}
					color={filter === item.label ? "blue.500" : "gray.600"}
					href="#"
					fontWeight={filter === item.label ? "bold" : "normal"}>
					{item.label}
				</Link>
				<Button
					mx={2}
					size={"xs"}
					key={key}
					variant={"outline"}>
					{getTicketCountForCategory(item.label)}
				</Button>
				</Flex>
			))}
			<Divider />
			{TERTIARY_ITEMS.map((item, key) => (
				<Flex>
				<Link
					key={key}
					onClick={() => handleFilter(item.label)}
					color={filter === item.label ? "blue.500" : "gray.600"}
					href="#"
					fontWeight={filter === item.label ? "bold" : "normal"}>
					{item.label}
				</Link>
				<Button
					mx={2}
					size={"xs"}
					key={key}
					variant={"outline"}>
					{getTicketCountForCategory(item.label)}
				</Button>
				</Flex>
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
