import {
	Divider,
	Flex,
	Link,
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import Backbutton from "./Backbutton";
import Product from "../entities/Product";
import Ticket from "../entities/Tickets";
import { getUserRole } from "../utils/SessionUtils";
import { useCallback, useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import Expert from "../entities/Expert";

function Sidebar({
	data,
	setData,
	filteredData,
	filter,
	setFilter,
	type,
	searchQuery,
}) {
	const role = getUserRole();
	const [oldData, setOldData] = useState([]);
	const [searchValue, setSearchValue] = useState(
		searchQuery ? searchQuery : ""
	);

	useEffect(() => {
		if (oldData.length === 0) {
			setOldData(filteredData);
		}
	}, [filteredData, oldData.length]);

	const getSidebarItems = (type) => {
		switch (type) {
			case "products":
				return Product.PRODUCT_ITEMS;
			case "tickets":
				return Ticket.TICKET_ITEMS;
			case "experts":
				return Expert.EXPERT_ITEMS;
			default:
				return [];
		}
	};

	const SIDEBAR_ITEMS = getSidebarItems(type);

	const _switchFilter = (filter) => {
		switch (type) {
			case "products":
				return Product.productsCallbacks.doSwitch(filter, data, searchValue);
			case "tickets":
				return Ticket.ticketsCallbacks.doSwitch(filter, data, searchValue);
			case "experts":
				return Expert.expertsCallbacks.doSwitch(filter, data, searchValue);
			default:
				return null;
		}
	};

	const switchFilter = useCallback(_switchFilter, [data, searchValue, type]);

	useEffect(() => {
		setData(switchFilter(filter));
	}, [filter, switchFilter, setData]);

	const handleFilter = (filter) => {
		setFilter(filter);
		setData(switchFilter(filter));
		setOldData(switchFilter(filter));
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
			<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
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

function SearchBar({ searchValue, setSearchValue }) {
	return (
		<InputGroup>
			<InputLeftElement pointerEvents="none">
				<SearchIcon color="gray.300" />
			</InputLeftElement>
			<Input
				placeholder="Search"
				onChange={(e) => setSearchValue(e.target.value)}
				value={searchValue}
				isTruncated
				bg={"white"}
			/>
		</InputGroup>
	);
}

export default Sidebar;
