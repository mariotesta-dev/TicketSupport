import { Divider, Flex, Link } from "@chakra-ui/react";
import Backbutton from "./Backbutton";
import Product from "../entities/Product";
import Ticket from "../entities/Tickets";
import { getUserRole } from "../utils/SessionUtils";

function Sidebar({ data, setData, filter, setFilter, type }) {
	const role = getUserRole();

	const getSidebarItems = (type) => {
		switch (type) {
			case "products":
				return Product.PRODUCT_ITEMS;
			case "tickets":
				return Ticket.TICKET_ITEMS;
			default:
				return [];
		}
	};

	const SIDEBAR_ITEMS = getSidebarItems(type);

	const switchFilter = (filter) => {
		switch (type) {
			case "products":
				return Product.productsCallbacks.doSwitch(filter, data);
			case "tickets":
				return Ticket.ticketsCallbacks.doSwitch(filter, data);
			default:
				return null;
		}
	};

	const handleFilter = (filter) => {
		setFilter(filter);
		setData(switchFilter(filter));
	};

	const getDataCountForCategory = (category) => {
		var prods = switchFilter(category);
		return prods.length;
	};

	return (
		<Flex
			direction={"column"}
			width={"220px"}
			height={"full"}
			bg={"gray.50"}
			position={"relative"}
			px={"30px"}
			py={"100px"}
			gap={5}>
			<Backbutton href={"/dashboard"} />
			{SIDEBAR_ITEMS.map(
				(section, key) =>
					section.filter((item) => item.roles.includes(role)).length > 0 && (
						<Flex direction={"column"} gap={5} key={key}>
							<Divider />
							{section
								.filter((item) => item.roles.includes(role))
								.map((item, key) => (
									<Link
										key={key}
										onClick={() => handleFilter(item.label)}
										color={filter === item.label ? "blue.500" : "gray.600"}
										href="#"
										fontWeight={filter === item.label ? "bold" : "normal"}>
										{item.label + ` (${getDataCountForCategory(item.label)})`}
									</Link>
								))}
						</Flex>
					)
			)}
		</Flex>
	);
}

export default Sidebar;
