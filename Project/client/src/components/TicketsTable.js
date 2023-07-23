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
import Status from "./Status";
import NewTicketButton from "./NewTicketButton";
import Pagination from "./Pagination";
import { DeleteIcon } from "@chakra-ui/icons";
import Chat from "./Chat";
import TicketsTableExpertField from "./TIcketsTableExpertField";

function TicketsTable({ tickets, filter, role }) {
	const [paginatedTickets, setPaginatedTickets] = useState();

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
						currentTickets={paginatedTickets}
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
								{role.match("manager") && <Th>Assigned To</Th>}
								<Th>Status</Th>
								<Th>Last Update</Th>
								<Th></Th>
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
							{paginatedTickets &&
								paginatedTickets.map((ticket, key) => (
									<Tr key={key}>
										<Td>{key + 1}</Td>
										<Td maxW={"180px"} overflow={"scroll"} isTruncated>
											{ticket.product.name}
										</Td>
										<Td>{ticket.summary}</Td>
										<Td>{ticket.category}</Td>
										{role.match("manager") &&
											(<Td>
												<TicketsTableExpertField ticket={ticket} />
											</Td>)
										}
										<Td>
											<Status status={ticket.status.status || "OPEN"} />
										</Td>
										<Td>
											{converters.formatDate(ticket.status.updatedAt) ||
												converters.formatDate(ticket.createdAt)}
										</Td>
										<Td width={20}>
											<Flex direction={"row"} gap={3}>
												<Chat ticket={ticket} />
												<Button size={"sm"} colorScheme="red">
													<DeleteIcon />
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

export default TicketsTable;
