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
								<Th></Th>
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
								paginatedProducts.map((ticket, key) => (
									<Tr key={key}>
										<Td>{key + 1}</Td>
										<Td maxW={"180px"} overflow={"scroll"} isTruncated>
											{ticket.product.name}
										</Td>
										<Td>{ticket.product.ean}</Td>
										<Td>{ticket.product.brand}</Td>
										<Td>{converters.formatDate(ticket.dateOfPurchase)}</Td>
										<Td>{converters.formatDate(ticket.endOfWarranty)}</Td>
										<Td>
											<Warranty endOfWarranty={ticket.endOfWarranty} />
										</Td>
										<Td width={20}>
											<Flex direction={"row"} gap={3}>
												<Button size={"sm"} colorScheme="blue">
													Extend Warranty
												</Button>
											</Flex>
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
