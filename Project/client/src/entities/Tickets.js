import Switch from "../utils/switchUtils";

const PRIMARY_ITEMS = [
	{
		label: "All",
		roles: ["customer", "expert", "manager"],
	},
];

const SECONDARY_ITEMS = [
	{
		label: "Unassigned",
		roles: ["customer", "expert", "manager"],
	},
];

const TERTIARY_ITEMS = [
	{
		label: "Open",
		roles: ["customer", "expert", "manager"],
	},
	{
		label: "In Progress",
		roles: ["customer", "expert", "manager"],
	},
	{
		label: "Reopened",
		roles: ["customer", "expert", "manager"],
	},
	{
		label: "Solved",
		roles: ["customer", "expert", "manager"],
	},
	{
		label: "Closed",
		roles: ["customer", "expert", "manager"],
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
