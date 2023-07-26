import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import ProductsTable from "../components/products/ProductsTable";
import { useOutletContext } from "react-router-dom";
import * as session from "../utils/SessionUtils.js";
import { productsAPI } from "../api/API.js";
import Product from "../entities/Product";
import Sidebar from "../components/Sidebar";

function ProductsDashboard() {
	const [user] = useOutletContext();
	const role = session.getUserRole();
	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState("All");

	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const handleGetProducts = async () => {
			if (role.match("customer")) {
				setProducts(
					user.warranties.map((warranty) =>
						Product.fromCustomer(warranty, user)
					)
				);
				setFilteredProducts(
					user.warranties.map((warranty) =>
						Product.fromCustomer(warranty, user)
					)
				);
			}
			if (role.match("manager")) {
				const response = await productsAPI.getProducts();
				setProducts(response.map((product) => Product.fromManager(product)));
				setFilteredProducts(
					response.map((product) => Product.fromManager(product))
				);
			}
		};
		handleGetProducts();
	}, [user, role]);

	return (
		<Flex width={"full"}>
			<Sidebar
				data={products}
				setData={setFilteredProducts}
				filteredData={filteredProducts}
				setFilteredData={setFilteredProducts}
				filter={filter}
				setFilter={setFilter}
				type={"products"}
			/>
			<ProductsTable products={filteredProducts} filter={filter} role={role} />
		</Flex>
	);
}

export default ProductsDashboard;
