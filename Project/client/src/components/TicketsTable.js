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
} from "@chakra-ui/react";

import React, { useState } from "react";
import Status from "./Status";
import NewTicketButton from "./NewTicketButton";
import Pagination from "./Pagination";

function TicketsTable({ tickets, filter }) {
	const [paginatedTickets, setPaginatedTickets] = useState([]);

	return (
		<Flex flexGrow={1} overflowX={"scroll"}>
			<Stack width={"100%"} padding={"20px"}>
				<Flex
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Text fontSize={"lg"} fontWeight={"bold"}>
						{filter} tickets
					</Text>
					<NewTicketButton />
				</Flex>

				<Divider />

				<Flex
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Text fontSize={"sm"} color={"gray.500"} fontWeight={"medium"}>
						{tickets.length} tickets
					</Text>
					<Pagination
						tickets={tickets}
						setCurrentTickets={setPaginatedTickets}
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
								<Th>Summary</Th>
								<Th>Category</Th>
								<Th>Assignee</Th>
								<Th>Status</Th>
								<Th>Last Update</Th>
							</Tr>
						</Thead>
						<Tbody>
							{tickets.length === 0 && (
								<Tr>
									<Td colSpan={7} textAlign={"center"}>
										<Text fontSize={"sm"} color={"gray.800"}>
											No tickets.
										</Text>
									</Td>
								</Tr>
							)}
							{paginatedTickets.map((ticket, key) => (
								<Tr key={key}>
									<Td>{key + 1}</Td>
									<Td maxW={"180px"} overflow={"scroll"} isTruncated>
										{ticket.product.name}
									</Td>
									<Td>{ticket.summary}</Td>
									<Td>{ticket.category}</Td>
									<Td>
										{ticket.assignedTo
											? ticket.assignedTo.name + " " + ticket.assignedTo.surname
											: "unassigned"}
									</Td>
									<Td>
										<Status status={ticket.history || "OPEN"} />
									</Td>
									<Td>{ticket.history || ticket.createdAt}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Stack>
		</Flex>
	);
}

export default TicketsTable;
