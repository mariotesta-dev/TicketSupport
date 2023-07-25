import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Pagination = ({ filter, data, setCurrentData, currentData }) => {
	const pageNumbers = [];
	const [currentPage, setCurrentPage] = useState(1);
	const dataPerPage = 10;

	useEffect(() => {
		const indexOfLastTicket = currentPage * dataPerPage;
		const indexOfFirstTicket = indexOfLastTicket - dataPerPage;
		setCurrentData(data.slice(indexOfFirstTicket, indexOfLastTicket));
	}, [currentPage, data, setCurrentData]);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		if (currentData && currentData.length === 0) {
			setCurrentPage(pageNumbers.length);
		}
	}, [filter, currentData, pageNumbers.length]);

	for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
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
					.filter((i) => {
						if (currentPage === pageNumbers.length) {
							return i >= currentPage - 2;
						}
						return i >= currentPage - 1;
					})
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
