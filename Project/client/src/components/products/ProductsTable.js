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

import * as converters from "../../utils/converters";
import React, { useState } from "react";
import Pagination from "../Pagination";
import Warranty from "../Warranty";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";
import AddPurchase from "../AddPurchaseModal";
import dayjs from "dayjs";

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
					<PrimaryButton
						href={
							role.match("customer")
								? "/dashboard/products/new"
								: "/dashboard/products/create"
						}>
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
								<Th textAlign={"center"}>#</Th>
								<Th textAlign={"center"}>Product</Th>
								<Th textAlign={"center"}>Brand</Th>
								<Th textAlign={"center"}>Date of purchase</Th>
								<Th textAlign={"center"}>End of warranty</Th>
								<Th textAlign={"center"}>Warranty</Th>
								{role.match("customer") && <Th textAlign={"center"}></Th>}
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
										<Td textAlign={"center"}>{key + 1}</Td>
										<Td maxW={"220px"} overflow={"hidden"}>
											<Flex direction={"column"} gap={1}>
												<Text fontSize={"16"} fontWeight={"bold"} isTruncated>
													{product.name}
												</Text>
												<Text fontSize={"14"} color={"gray.500"}>
													{product.ean}
												</Text>
											</Flex>
										</Td>
										<Td textAlign={"center"} fontSize={15} color={"gray.500"}>
											<Text>{product.brand}</Text>
										</Td>
										<Td textAlign={"center"} fontSize={15} color={"gray.500"}>
											<Text>
												{product.warranty
													? dayjs(product.warranty.dateOfPurchase).format(
															"D MMM YYYY"
													  )
													: role.match("manager") &&
													  !product.warranty && (
															<AddPurchase product={product} />
													  )}
											</Text>
										</Td>
										<Td textAlign={"center"} fontSize={15} color={"gray.500"}>
											<Text>
												{product.warranty
													? dayjs(product.warranty.endOfWarranty).format(
															"D MMM YYYY"
													  )
													: "-"}
											</Text>
										</Td>
										<Td textAlign={"center"} fontSize={15} color={"gray.500"}>
											<Warranty
												endOfWarranty={
													product.warranty
														? product.warranty.endOfWarranty
														: null
												}
												isActivated={
													product.warranty
														? product.warranty.isActivated
														: false
												}
											/>
										</Td>
										<Td textAlign={"center"}>
											{role.match("customer") && (
												<Link
													to={`/dashboard/warranty/${product.ean}/payment/`}
													state={{
														product: product,
														endOfWarranty: product.warranty
															? converters.formatDate(
																	product.warranty.endOfWarranty
															  )
															: "-",
														dateOfPurchase: product.warranty
															? converters.formatDate(
																	product.warranty.dateOfPurchase
															  )
															: "-",
													}}>
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
