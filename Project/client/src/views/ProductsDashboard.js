import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import ProductsTable from "../components/ProductsTable";
import { useOutletContext } from "react-router-dom";
import * as session from "../utils/SessionUtils.js";
import { productsAPI } from "../api/API.js";
import SidebarProducts from "../components/SidebarProducts";

function ProductsDashboard() {
	const [user] = useOutletContext();
	const role = session.getUserRole();
	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState("All");

	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const handleGetProducts = async () => {
			if (role.match("customer")) {
				setProducts(user.warranties);
				setFilteredProducts(user.warranties);
			}
			if (role.match("manager")) {
				const response = await productsAPI.getProducts();
				setProducts(response);
				setFilteredProducts(response);
			}
		};
		handleGetProducts();
	}, [user, role]);

	return (
		<Flex width={"full"} flexGrow={1} alignContent={"stretch"}>
			<SidebarProducts
				user={user}
				products={products}
				setProducts={setFilteredProducts}
				filter={filter}
				setFilter={setFilter}
			/>
			<ProductsTable products={filteredProducts} filter={filter} role={role} />
		</Flex>
	);
}

export default ProductsDashboard;
