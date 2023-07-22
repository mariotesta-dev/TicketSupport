import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Pagination = ({ filter, tickets, setCurrentTickets }) => {
	const pageNumbers = [];
	const [currentPage, setCurrentPage] = useState(1);
	const ticketsPerPage = 6;

	useEffect(() => {
		const indexOfLastTicket = currentPage * ticketsPerPage;
		const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
		setCurrentTickets(tickets.slice(indexOfFirstTicket, indexOfLastTicket));
	}, [currentPage, tickets, setCurrentTickets]);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [filter]);

	for (let i = 1; i <= Math.ceil(tickets.length / ticketsPerPage); i++) {
		pageNumbers.push(i);
	}

	const handleClick = (number) => {
		paginate(number);
	};

	const handleNext = () => {
		const number =
			currentPage + 1 > pageNumbers.length ? currentPage : currentPage + 1;
		paginate(number);
	};

	const handlePrev = () => {
		const number = currentPage - 1 < 1 ? currentPage : currentPage - 1;
		paginate(number);
	};

	return (
		<Flex direction={"row"} gap={1}>
			<Button size={"sm"} onClick={() => handlePrev()}>
				<ArrowLeftIcon boxSize={2.5} />
			</Button>
			{(pageNumbers.length <= 3 || currentPage <= 3) &&
				pageNumbers
					.filter((i) => i <= 3)
					.map((number) => (
						<Button
							size={"sm"}
							key={number}
							variant={number === currentPage ? "outline" : "solid"}
							onClick={() => handleClick(number)}>
							{number}
						</Button>
					))}
			{pageNumbers.length > 3 &&
				currentPage > 3 &&
				pageNumbers
					.filter((i) => i >= currentPage - 1)
					.map((number) => (
						<Button
							size={"sm"}
							key={number}
							variant={number === currentPage ? "outline" : "solid"}
							onClick={() => handleClick(number)}>
							{number}
						</Button>
					))}
			<Button size={"sm"} onClick={() => handleNext()}>
				<ArrowRightIcon boxSize={2.5} />
			</Button>
		</Flex>
	);
};

export default Pagination;
