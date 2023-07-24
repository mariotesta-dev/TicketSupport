import { Divider, Flex, Link } from "@chakra-ui/react";
import Backbutton from "./Backbutton";

function SidebarProducts({ user, products, setProducts, filter, setFilter }) {
	const handleFilter = (filter) => {
		setFilter(filter);
		switch (filter) {
			case "All":
				setProducts(products);
				break;
			case "Active Warranty":
				setProducts(
					products.filter(
						(product) => new Date(product.endOfWarranty) >= new Date()
					)
				);
				break;
			case "Expired Warranty":
				setProducts(
					products.filter(
						(product) => new Date(product.endOfWarranty) < new Date()
					)
				);
				break;
			default:
				setProducts(products);
		}
	};

	const getProductsCountForCategory = (category) => {
		switch (category) {
			case "All":
				return products.length;
			case "Active Warranty":
				return products.filter(
					(product) => new Date(product.endOfWarranty) >= new Date()
				).length;
			case "Expired Warranty":
				return products.filter(
					(product) => new Date(product.endOfWarranty) < new Date()
				).length;
			default:
				return products.length;
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
					{item.label + ` (${getProductsCountForCategory(item.label)})`}
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
					{item.label + ` (${getProductsCountForCategory(item.label)})`}
				</Link>
			))}

			{TERTIARY_ITEMS.map((item, key) => (
				<>
					<Divider />
					<Link
						key={key}
						onClick={() => handleFilter(item.label)}
						color={filter === item.label ? "blue.500" : "gray.600"}
						href="#"
						fontWeight={filter === item.label ? "bold" : "normal"}>
						{item.label + ` (${getProductsCountForCategory(item.label)})`}
					</Link>
				</>
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
		label: "Active Warranty",
	},
	{
		label: "Expired Warranty",
	},
];

const TERTIARY_ITEMS = [];

export default SidebarProducts;
