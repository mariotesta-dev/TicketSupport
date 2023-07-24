import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Stack,
	Divider,
	Text,
	Flex,
	Button,
} from "@chakra-ui/react";

import * as converters from "../utils/converters";
import React, { useState } from "react";
import Pagination from "./Pagination";
import Warranty from "./Warranty";
import PrimaryButton from "./PrimaryButton";

function ProductsTable({ products, filter, role }) {
	const [paginatedProducts, setPaginatedProducts] = useState();

	return (
		<Flex flexGrow={1} overflowX={"scroll"}>
			<Stack width={"100%"} padding={"20px"}>
				<Flex
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Text fontSize={"lg"} fontWeight={"bold"}>
						{filter} products
					</Text>
					<PrimaryButton href={"/dashboard/products/new"}>
						Add Product
					</PrimaryButton>
				</Flex>

				<Divider />

				<Flex
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Text fontSize={"sm"} color={"gray.500"} fontWeight={"medium"}>
						{products.length} products
					</Text>
					<Pagination
						data={products}
						setCurrentData={setPaginatedProducts}
						currentData={paginatedProducts}
						filter={filter}
					/>
				</Flex>

				<Divider />
				<TableContainer>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>#</Th>
								<Th>Product</Th>
								<Th>EAN</Th>
								<Th>Brand</Th>
								<Th>Date of purchase</Th>
								<Th>End of warranty</Th>
								<Th>Warranty</Th>
								{role.match("customer") && <Th></Th>}
							</Tr>
						</Thead>
						<Tbody>
							{products.length === 0 && (
								<Tr>
									<Td colSpan={7} textAlign={"center"}>
										<Text fontSize={"sm"} color={"gray.800"}>
											No products.
										</Text>
									</Td>
								</Tr>
							)}
							{paginatedProducts &&
								paginatedProducts.map((product, key) => (
									<Tr key={key}>
										<Td>{key + 1}</Td>
										<Td maxW={"180px"} overflow={"scroll"} isTruncated>
											{product.name ? product.name : product.product.name}
										</Td>
										<Td>{product.ean ? product.ean : product.product.ean}</Td>
										<Td>
											{product.brand ? product.brand : product.product.brand}
										</Td>
										<Td>
											{role.match("manager") &&
												(product.warranty
													? converters.formatDate(
															product.warranty.dateOfPurchase
													  )
													: "-")}
											{role.match("customer") &&
												(product.dateOfPurchase
													? converters.formatDate(product.dateOfPurchase)
													: "-")}
										</Td>
										<Td>
											{role.match("manager") &&
												(product.warranty
													? converters.formatDate(
															product.warranty.endOfWarranty
													  )
													: "-")}
											{role.match("customer") &&
												(product.endOfWarranty
													? converters.formatDate(product.endOfWarranty)
													: "-")}
										</Td>
										<Td>
											<Warranty
												endOfWarranty={
													product.warranty
														? product.warranty.endOfWarranty
														: product.endOfWarranty
												}
											/>
										</Td>
										{role.match("customer") && (
											<Td width={20}>
												<Flex direction={"row"} gap={3}>
													<Button size={"sm"} colorScheme="blue">
														Extend Warranty
													</Button>
												</Flex>
											</Td>
										)}
									</Tr>
								))}
						</Tbody>
					</Table>
				</TableContainer>
			</Stack>
		</Flex>
	);
}

export default ProductsTable;
