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
	Tooltip,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import * as converters from "../../utils/converters";
import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Pagination from "../Pagination";
import TicketsTableExpertField from "./TicketsTableExpertField";
import Status from "../Status";
import Chat from "../Chat";
import TicketHistoryModal from "./TicketHistoryModal";

function TicketsTable({ tickets, filter, role}) {
	const [paginatedTickets, setPaginatedTickets] = useState();

	return (
		<Flex flexGrow={1} overflow={"auto"}>
			<Stack width={"100%"} padding={"20px"}>
				<Flex
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Text fontSize={"lg"} fontWeight={"bold"}>
						{filter} tickets
					</Text>
					<PrimaryButton href={"/dashboard/tickets/new"}>
						New Ticket
					</PrimaryButton>
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
						data={tickets}
						setCurrentData={setPaginatedTickets}
						currentData={paginatedTickets}
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
										<Td
											maxW={"200px"}
											overflow={"scroll"}
											isTruncated
											fontSize={"16"}
											fontWeight={"bold"}>
											{ticket.product.name}
										</Td>
										<Td
											maxW={"165px"}
											overflow={"scroll"}
											isTruncated
											fontSize={"14"}
											color={"gray.500"}>
											{ticket.summary}
										</Td>
										<Td fontSize={"14"} color={"gray.500"}>
											{ticket.category}
										</Td>
										{role.match("manager") && (
											<Td>
												<TicketsTableExpertField ticket={ticket} />
											</Td>
										)}
										<Td>
											{role.match("manager") ? (
												<Tooltip
													label="DEBUG: this will be used to change status"
													placement="top">
													<Button variant={"outline"}>
														<Status status={ticket.status.status || "OPEN"} />
													</Button>
												</Tooltip>
											) : (
												<Status status={ticket.status.status || "OPEN"} />
											)}
										</Td>
										<Td fontSize={14} color={"gray.500"}>
											{converters.formatDate(ticket.status.updatedAt) ||
												converters.formatDate(ticket.createdAt)}
										</Td>
										<Td width={20}>
											<Flex direction={"row"} gap={3}>
												{(role.match("customer") || role.match("expert")) && (
													<Chat ticket={ticket} />
												)}
												{role.match("manager") && (
													<TicketHistoryModal ticket={ticket}/>
												)}
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
