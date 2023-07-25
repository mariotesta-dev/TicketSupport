import Switch from "../utils/switchUtils";

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

export default class Ticket {
	static ticketsCallbacks = new Switch({
		All: (tickets) => tickets,
		Unassigned: (tickets) =>
			tickets.filter((ticket) => ticket.assignedTo === null),
		Open: (tickets) =>
			tickets.filter((ticket) => ticket.status.status === "OPEN"),
		"In Progress": (tickets) =>
			tickets.filter((ticket) => ticket.status.status === "IN_PROGRESS"),
		Reopened: (tickets) =>
			tickets.filter((ticket) => ticket.status.status === "REOPENED"),
		Solved: (tickets) =>
			tickets.filter((ticket) => ticket.status.status === "SOLVED"),
		Closed: (tickets) =>
			tickets.filter((ticket) => ticket.status.status === "CLOSED"),
	});

	static TICKET_ITEMS = [PRIMARY_ITEMS, SECONDARY_ITEMS, TERTIARY_ITEMS];
}
