import { Divider, Flex, Link, Input } from "@chakra-ui/react";
import Backbutton from "./Backbutton";
import Product from "../entities/Product";
import Ticket from "../entities/Tickets";
import { getUserRole } from "../utils/SessionUtils";
import { useState } from "react";

function Sidebar({ data, setData, filteredData, setFilteredData, filter, setFilter, type }) {
	const role = getUserRole();
	const [oldData, setOldData] = useState(filteredData);

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
		setFilteredData(switchFilter(filter));
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
			{type==="products" && <SearchBar data={data} oldData={oldData} type={type} filteredData={filteredData} setFilteredData={setFilteredData}/>}
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

function SearchBar({ data, oldData, type, filteredData, setFilteredData }) {
  const [filterName, setFilterName] = useState("");

  const filterResults = (e) => {
    const filterValue = e.target.value;
    setFilterName(filterValue);

    if (type === "products") {
      if (filterValue === "") {
        setFilteredData(oldData);
      } else {
        setFilteredData(() => {
          return oldData.filter((item) => {
            return item.name.toLowerCase().includes(filterValue.toLowerCase());
          });
        });
      }
    }
  };

  return (
    <Input
      placeholder="Filter your products..."
      onChange={filterResults}
      value={filterName}
	  isTruncated
    />
  );
}

export default Sidebar;
