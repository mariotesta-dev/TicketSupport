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

import React, { useState } from "react";
import Pagination from "../Pagination";
import PrimaryButton from "../PrimaryButton";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Expertise } from "../Expertise";
import Evaluation from "../Evaluation";

function ExpertsTable({ experts, filter }) {
	const [paginatedExperts, setPaginatedExperts] = useState();

	return (
		<Flex flexGrow={1} overflowX={"scroll"}>
			<Stack width={"100%"} padding={"20px"}>
				<Flex
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Text fontSize={"lg"} fontWeight={"bold"}>
						{filter} experts
					</Text>
					<PrimaryButton href={"/dashboard/experts/new"}>
						Add Expert
					</PrimaryButton>
				</Flex>

				<Divider />

				<Flex
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Text fontSize={"sm"} color={"gray.500"} fontWeight={"medium"}>
						{experts.length} experts
					</Text>
					<Pagination
						data={experts}
						setCurrentData={setPaginatedExperts}
						currentData={paginatedExperts}
						filter={filter}
					/>
				</Flex>

				<Divider />
				<TableContainer>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th textAlign={"center"}>#</Th>
								<Th textAlign={"center"}>Name</Th>
								<Th textAlign={"center"}>Surname</Th>
								<Th textAlign={"center"}>Email</Th>
								<Th textAlign={"center"}>Expertise</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							{experts.length === 0 && (
								<Tr>
									<Td colSpan={7} textAlign={"center"}>
										<Text fontSize={"sm"} color={"gray.800"}>
											No experts.
										</Text>
									</Td>
								</Tr>
							)}
							{paginatedExperts &&
								paginatedExperts.map((expert, key) => (
									<Tr key={key}>
										<Td textAlign={"center"}>{key + 1}</Td>
										<Td textAlign={"center"} fontSize={15} color={"gray.500"}>
											<Text>{expert.name}</Text>
										</Td>
										<Td textAlign={"center"} fontSize={15} color={"gray.500"}>
											<Text>{expert.surname}</Text>
										</Td>
										<Td textAlign={"center"} fontSize={15} color={"gray.500"}>
											<Text>{expert.email}</Text>
										</Td>
										<Td textAlign={"center"}>
											<Expertise expertise={expert.expertise} />
										</Td>
										<Td textAlign={"end"}>
											<Evaluation expert={expert} />
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

export default ExpertsTable;
