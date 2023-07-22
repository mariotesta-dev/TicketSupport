import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Box,
	Stack,
	Divider,
	Text,
} from "@chakra-ui/react";

import React from "react";
import { useOutletContext } from "react-router-dom";
import Status from "./Status";

function TicketsTable(props) {
	const [user, setUser] = useOutletContext();

	return (
		<Stack width={"full"}>
			<Text fontSize={"lg"} fontWeight={"bold"}>
				All tickets
			</Text>
			<Divider />
			<Text fontSize={"sm"} color={"gray.500"} fontWeight={"medium"}>
				{user.tickets.length} tickets
			</Text>
			<Divider />
			<TableContainer>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th>Product EAN</Th>
							<Th>Summary</Th>
							<Th>Category</Th>
							<Th>Status</Th>
							<Th>Last Update</Th>
						</Tr>
					</Thead>
					<Tbody>
						{user.tickets.length === 0 && (
							<Tr>
								<Td colSpan={5} textAlign={"center"}>
									<Text fontSize={"sm"} color={"gray.800"}>
										No tickets.
									</Text>
								</Td>
							</Tr>
						)}
						{user.tickets.map((ticket, key) => (
							<Tr key={key}>
								<Td>{key + 1}</Td>
								<Td>{ticket.product.ean}</Td>
								<Td>{ticket.summary}</Td>
								<Td>{ticket.category}</Td>
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
	);
}

export default TicketsTable;
