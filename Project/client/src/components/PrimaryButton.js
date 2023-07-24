import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

function PrimaryButton({ href, children }) {
	return (
		<Button
			as="a"
			width={180}
			leftIcon={<PlusSquareIcon />}
			colorScheme="blue"
			variant="solid"
			href={href}>
			{children}
		</Button>
	);
}

export default PrimaryButton;
