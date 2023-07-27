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
	Tooltip,
} from "@chakra-ui/react";
import * as converters from "../../utils/converters";
import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Pagination from "../Pagination";
import TicketsTableExpertField from "./TicketsTableExpertField";
import { Status } from "../Status";
import Chat from "../Chat";
import History from "../history/History";
import ChangeStatusModal from "./ChangeStatusModal";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

function TicketsTable({ tickets, filter, role }) {
	const [paginatedTickets, setPaginatedTickets] = useState();
	const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending
  const [sortColumn, setSortColumn] = useState(""); // Column to sort by

  const handleSortByPriority = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn("priority");

    // Define a custom sorting order for the priorities
    const priorityOrder = ["LOW", "MEDIUM", "HIGH"];

    // Sort the tickets array based on the priority and sort order
    const sortedTickets = [...tickets].sort((a, b) => {
      const aPriorityIndex = priorityOrder.indexOf(a.priority);
      const bPriorityIndex = priorityOrder.indexOf(b.priority);

      if (newSortOrder === "asc") {
        return aPriorityIndex - bPriorityIndex;
      } else {
        return bPriorityIndex - aPriorityIndex;
      }
    });

    // Set the sorted tickets to the paginatedTickets state
    setPaginatedTickets(sortedTickets);
  };

  const renderSortIcon = () => {
    if (sortColumn === "priority") {
      return sortOrder === "asc" ? <TriangleUpIcon /> : <TriangleDownIcon />;
    }
    return null;
  };

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
								<Th onClick={handleSortByPriority} textAlign={"center"}>Priority {renderSortIcon()}</Th>
								)}
								<Th textAlign={"center"}>Last Update</Th>
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
												<ChangeStatusModal ticket={ticket} type={"status"} />
											) : (
												<Status status={ticket.status.status || "OPEN"} />
											)}
										</Td>
										{role.match("manager") && ticket.priority && (<Td textAlign={"center"} fontSize={14} color={"gray.500"}>
											<ChangeStatusModal ticket={ticket} type={"priority"}/>
										</Td>) }
										{role.match("manager") && !ticket.priority && (<Td textAlign={"center"} fontSize={14} color={"gray.500"}>
											<ChangeStatusModal ticket={ticket} type={"priority"}/>
										</Td>)}
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

export default TicketsTable;
