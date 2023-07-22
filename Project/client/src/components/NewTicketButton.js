import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

function NewTicketButton() {
	return (
		<Button
            as="a"
            width={180}
            mt={4}
			leftIcon={<PlusSquareIcon />}
			colorScheme="blue"
			variant="outline"
			href="tickets/new">
			Create a new ticket
		</Button>
	);
}

export default NewTicketButton;
