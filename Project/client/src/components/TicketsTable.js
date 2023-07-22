import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Box,
	Stack,
	Divider,
	Text,
	Flex,
} from "@chakra-ui/react";

import React from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Status from "./Status";
import NewTicketButton from "./NewTicketButton";
import Pagination from "./Pagination";

function TicketsTable(props) {
	const [user] = useOutletContext();

	const [currentPage, setCurrentPage] = useState(1);
	const [ticketsPerPage] = useState(2);

	const indexOfLastTicket = currentPage * ticketsPerPage;
	const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
	const currentTickets = user.tickets.slice(indexOfFirstTicket, indexOfLastTicket);

	const paginate = pageNumber => setCurrentPage(pageNumber);

	return (
		<Flex flexGrow={1} overflowX={"scroll"}>
			<Stack width={"100%"} padding={"20px"}>
				<Flex
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Text fontSize={"lg"} fontWeight={"bold"}>
						All tickets
					</Text>
					<NewTicketButton />
				</Flex>

				<Divider />

				<Flex
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Text fontSize={"sm"} color={"gray.500"} fontWeight={"medium"}>
						{user.tickets.length} tickets
					</Text>
					<Pagination ticketsPerPage={ticketsPerPage} totalTickets={user.tickets.length} paginate={paginate} />
				</Flex>
	

				<Divider />
				<TableContainer>
					<Table 
						variant="simple"
					>
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
							{user.tickets.length === 0 && (
								<Tr>
									<Td colSpan={7} textAlign={"center"}>
										<Text fontSize={"sm"} color={"gray.800"}>
											No tickets.
										</Text>
									</Td>
								</Tr>
							)}
							{currentTickets.map((ticket, key) => (
								<Tr key={key}>
									<Td>{key + 1}</Td>
									<Td maxW={"180px"} overflow={"scroll"} isTruncated>
										{ticket.product.name}
									</Td>
									<Td>{ticket.summary}</Td>
									<Td>{ticket.category}</Td>
									<Td>
										{ticket.assignedTo
											? (ticket.assignedTo.name + " " + ticket.assignedTo.surname)
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
