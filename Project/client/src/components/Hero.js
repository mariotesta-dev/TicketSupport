import React from "react";

import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";

export default function Hero() {
	return <CallToActionWithAnnotation />;
}

function CallToActionWithAnnotation() {
	return (
		<>
			<Container maxW={"3xl"}>
				<Stack
					as={Box}
					textAlign={"center"}
					spacing={{ base: 8, md: 14 }}
					py={{ base: 20, md: 36 }}>
					<Heading
						fontWeight={600}
						fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
						lineHeight={"110%"}>
						Ticket <br />
						<Text as={"span"} color={"blue.400"}>
							Support
						</Text>
					</Heading>
					<Text color={"gray.500"}>
						Have you bought a product from us and have a problem with it? <br />
						We can help you with that!
					</Text>
					<Stack
						direction={"column"}
						spacing={3}
						align={"center"}
						alignSelf={"center"}
						position={"relative"}>
						<Button
							as={"a"}
							colorScheme={"green"}
							bg={"blue.400"}
							rounded={"full"}
							px={6}
							_hover={{
								bg: "blue.500",
							}}
							href={"/signin"}>
							Get Started
						</Button>
					</Stack>
				</Stack>
			</Container>
		</>
	);
}
