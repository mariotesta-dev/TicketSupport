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
	Center,
} from "@chakra-ui/react";

import * as converters from "../../utils/converters";
import React, { useState } from "react";
import Pagination from "../Pagination";
import Warranty from "../Warranty";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";

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
										<Td maxW={"300px"} overflow={"scroll"} isTruncated>
											<Flex direction={"column"} gap={1}>
												<Text fontSize={"16"} fontWeight={"bold"}>{product.name ? product.name : product.product.name}</Text>
												<Text fontSize={"14"} color={"gray.500"}>{product.ean ? product.ean : product.product.ean}</Text>
											</Flex>
										</Td>
										<Td fontSize={15} color={"gray.500"}>
											<Text>
												{product.brand}
											</Text>
										</Td>
										<Td fontSize={15} color={"gray.500"}>
											<Center>
												<Text>
													{product.warranty
														? converters.formatDate(product.warranty.dateOfPurchase)
														: "-"}
												</Text>
											</Center>
										</Td>
										<Td fontSize={15} color={"gray.500"}>
											<Center>
												<Text>
													{product.warranty
														? converters.formatDate(product.warranty.endOfWarranty)
														: "-"}
												</Text>
											</Center>
										</Td>
										<Td fontSize={15} color={"gray.500"}>
											<Center>
												<Warranty
													endOfWarranty={
														product.warranty
															? product.warranty.endOfWarranty
															: null
													}
												/>
											</Center>
										</Td>
										<Td>
										{role.match("customer") && (
											<Link 
											to={`/dashboard/warranty/${product.ean}/payment/`}
											state={
												{product: product,
												endOfWarranty: product.warranty ? converters.formatDate(product.warranty.endOfWarranty) : '-',
												dateOfPurchase: product.warranty? converters.formatDate(product.warranty.dateOfPurchase) : '-'}}>
												<Button size={"sm"} colorScheme="blue">
													Extend Warranty
												</Button>
											</Link>
										)}
										</Td>
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
