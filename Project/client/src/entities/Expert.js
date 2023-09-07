import Switch from "../utils/switchUtils";

const PRIMARY_ITEMS = [
	{
		label: "All",
		roles: ["manager"],
	},
];

const SECONDARY_ITEMS = [];

const TERTIARY_ITEMS = [
	{
		label: "Information",
		roles: ["manager"],
	},
	{
		label: "Hardware",
		roles: ["manager"],
	},
	{
		label: "Maintenance",
		roles: ["manager"],
	},
	{
		label: "Network",
		roles: ["manager"],
	},
	{
		label: "Other",
		roles: ["manager"],
	},
	{
		label: "Software",
		roles: ["manager"],
	},
	{
		label: "Payment issues",
		roles: ["manager"],
	},
	{
		label: "Bug reports",
		roles: ["manager"],
	},
];

export default class Expert {
	static expertsCallbacks = new Switch(
		{
			All: (experts) => experts,
			Assigned: (experts) =>
				experts.filter((expert) => expert.tickets.length === 0),
			Unassigned: (experts) =>
				experts.filter((expert) => expert.tickets.length === 0),
			Information: (experts) =>
				experts.filter((expert) => expert.expertise === "INFORMATION"),
			Hardware: (experts) =>
				experts.filter((expert) => expert.expertise === "HARDWARE"),
			Maintenance: (experts) =>
				experts.filter((expert) => expert.expertise === "MAINTENANCE"),
			Network: (experts) =>
				experts.filter((expert) => expert.expertise === "NETWORK"),
			Other: (experts) =>
				experts.filter((expert) => expert.expertise === "OTHER"),
			Software: (experts) =>
				experts.filter((expert) => expert.expertise === "SOFTWARE"),
			"Payment issues": (experts) =>
				experts.filter((expert) => expert.expertise === "PAYMENT_ISSUES"),
			"Bug reports": (experts) =>
				experts.filter((expert) => expert.expertise === "BUG_REPORTS"),
		},
		[
			(expert, searchValue) => {
				return (
					expert.name.toLowerCase().includes(searchValue.toLowerCase()) ||
					expert.surname.toLowerCase().includes(searchValue.toLowerCase())
				);
			},
		]
	);

	static EXPERT_ITEMS = [PRIMARY_ITEMS, SECONDARY_ITEMS, TERTIARY_ITEMS];
}
