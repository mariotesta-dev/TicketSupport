import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

function NewTicketButton() {
	return (
		<Button
			as="a"
			width={180}
			leftIcon={<PlusSquareIcon />}
			colorScheme="blue"
			variant="solid"
			href="tickets/new">
			New ticket
		</Button>
	);
}

export default NewTicketButton;
