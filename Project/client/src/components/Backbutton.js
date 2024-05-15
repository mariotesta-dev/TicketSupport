import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Backbutton({ href }) {
	const navigate = useNavigate();

	return (
		<Button
			position={"absolute"}
			top={"20px"}
			left={"20px"}
			leftIcon={<ArrowBackIcon />}
			colorScheme="blue"
			variant="outline"
			onClick={() => navigate(-1)}>
			Back
		</Button>
	);
}

export default Backbutton;
