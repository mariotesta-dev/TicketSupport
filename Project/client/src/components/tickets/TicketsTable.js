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
import * as converters from "../../utils/converters";
import React, { useCallback, useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Pagination from "../Pagination";
import TicketsTableExpertField from "./TicketsTableExpertField";
import { Status } from "../Status";
import Chat from "../Chat";
import History from "../history/History";
import ChangeStatusModal from "./ChangeStatusModal";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import Priority from "./Priority";

function TicketsTable({ tickets, filter, role }) {
	const [paginatedTickets, setPaginatedTickets] = useState();
	const [sortColumn, setSortColumn] = useState(""); // Column to sort by

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
					{role.match("customer") && (
						<PrimaryButton href={"/dashboard/tickets/new"}>
							New Ticket
						</PrimaryButton>
					)}
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
								<Th textAlign={"center"}>#</Th>
								<Th textAlign={"center"}>Product</Th>
								<Th textAlign={"center"}>Summary</Th>
								<Th textAlign={"center"}>Category</Th>
								{role.match("manager") && (
									<Th textAlign={"center"}>Assigned To</Th>
								)}
								<Th textAlign={"center"}>Status</Th>
								{role.match("manager") && (
									<ThSorting
										label={"Priority"}
										sortColumn={sortColumn}
										setSortColumn={setSortColumn}
										tickets={tickets}
										setPaginatedTickets={setPaginatedTickets}
									/>
								)}
								<ThSorting
									label={"Last Update"}
									sortColumn={sortColumn}
									setSortColumn={setSortColumn}
									tickets={tickets}
									setPaginatedTickets={setPaginatedTickets}
								/>
								<Th textAlign={"center"}></Th>
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
										<Td textAlign={"center"}>{key + 1}</Td>

										<Td
											maxW={"200px"}
											overflow={"scroll"}
											isTruncated
											fontSize={"16"}
											fontWeight={"bold"}>
											<Flex direction={"column"} gap={1}>
												<Text fontSize={"16"} fontWeight={"bold"} isTruncated>
													{ticket.product.name}
												</Text>
												<Text
													fontSize={"14"}
													fontWeight={"normal"}
													color={"gray.500"}>
													{ticket.product.ean}
												</Text>
											</Flex>
										</Td>
										<Td
											textAlign={"center"}
											maxW={"165px"}
											overflow={"scroll"}
											isTruncated
											fontSize={"14"}
											color={"gray.500"}>
											{ticket.summary}
										</Td>
										<Td textAlign={"center"} fontSize={"14"} color={"gray.500"}>
											{ticket.category}
										</Td>
										{role.match("manager") && (
											<Td textAlign={"center"}>
												<TicketsTableExpertField ticket={ticket} />
											</Td>
										)}
										<Td textAlign={"center"}>
											{role.match("manager") ? (
												<ChangeStatusModal ticket={ticket} />
											) : (
												<Status status={ticket.status.status || "OPEN"} />
											)}
										</Td>
										{role.match("manager") && (
											<Td textAlign={"center"} fontSize={14} color={"gray.500"}>
												<Priority ticket={ticket} />
											</Td>
										)}
										<Td textAlign={"center"} fontSize={14} color={"gray.500"}>
											{converters.formatDateTime(ticket.status.updatedAt) ||
												converters.formatDateTime(ticket.createdAt)}
										</Td>
										<Td textAlign={"center"} width={20}>
											<Flex direction={"row"} gap={3}>
												{(role.match("customer") || role.match("expert")) && (
													<Chat ticket={ticket} />
												)}
												{role.match("manager") && <History ticket={ticket} />}
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

function ThSorting({
	label,
	sortColumn,
	setSortColumn,
	tickets,
	setPaginatedTickets,
}) {
	const [sortAsc, setSortAsc] = useState(true); // "asc" for ascending, "desc" for descending

	const _sortTicketsByPriority = (isAsc) => {
		const mapPriority = (priority) => {
			switch (priority) {
				case "HIGH":
					return 3;
				case "MEDIUM":
					return 2;
				case "LOW":
					return 1;
				default:
					return 0;
			}
		};

		let sortedTickets = [...tickets].sort((a, b) => {
			return mapPriority(a.priority) - mapPriority(b.priority);
		});

		setPaginatedTickets(isAsc ? sortedTickets : sortedTickets.reverse());
	};

	const _sortTicketsByLastUpdate = (isAsc) => {
		let sortedTickets = [...tickets].sort((a, b) => {
			return new Date(a.status.updatedAt) - new Date(b.status.updatedAt);
		});
		setPaginatedTickets(isAsc ? sortedTickets : sortedTickets.reverse());
	};

	const sortTicketsByPriority = useCallback(_sortTicketsByPriority, [
		tickets,
		setPaginatedTickets,
	]);
	const sortTicketsByLastUpdate = useCallback(_sortTicketsByLastUpdate, [
		tickets,
		setPaginatedTickets,
	]);

	const _handleSortBy = (label) => {
		setSortAsc((prev) => !prev);
		setSortColumn(label);

		switch (label) {
			case "Priority":
				sortTicketsByPriority(sortAsc);
				break;
			case "Last Update":
				sortTicketsByLastUpdate(sortAsc);
				break;
			default:
				break;
		}
	};

	const handleSortBy = useCallback(_handleSortBy, [
		setSortColumn,
		sortAsc,
		sortTicketsByLastUpdate,
		sortTicketsByPriority,
	]);

	useEffect(() => {
		if (sortColumn === label) {
			switch (label) {
				case "Priority":
					sortTicketsByPriority(sortAsc);
					break;
				case "Last Update":
					sortTicketsByLastUpdate(sortAsc);
					break;
				default:
					break;
			}
		}
	}, [
		tickets,
		sortColumn,
		label,
		sortAsc,
		sortTicketsByLastUpdate,
		sortTicketsByPriority,
	]);

	const renderSortIcon = () => {
		if (sortColumn === label) {
			return !sortAsc ? <TriangleUpIcon /> : <TriangleDownIcon />;
		}
		return null;
	};

	return (
		<Th
			onClick={() => handleSortBy(label)}
			textAlign={"center"}
			cursor={"pointer"}
			textColor={sortColumn === label ? "blue.400" : "gray.600"}>
			{label} {renderSortIcon()}
		</Th>
	);
}

export default TicketsTable;
