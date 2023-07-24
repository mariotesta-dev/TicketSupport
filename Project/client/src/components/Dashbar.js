import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	Menu,
	MenuButton,
	Avatar,
	MenuList,
	MenuItem,
	MenuDivider,
} from "@chakra-ui/react";
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import * as session from "../utils/SessionUtils.js";

export default function Dashbar() {
	const NAV_ITEMS = getNavItems({ role: session.getUserRole() });
	return <WithSubnavigation NAV_ITEMS={NAV_ITEMS} />;
}

function WithSubnavigation({ NAV_ITEMS }) {
	const user = session.getDecodedJwtToken();

	const { isOpen, onToggle } = useDisclosure();

	const navigate = useNavigate();

	//console.log(user);

	const handleLogOut = () => {
		session.cleanSession();
		navigate(0);
	};

	return (
		<Box>
			<Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}>
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
					<Text
						textAlign={useBreakpointValue({ base: "center", md: "left" })}
						fontFamily={"heading"}
						color={useColorModeValue("gray.800", "white")}
						fontWeight={"bold"}>
						Dashboard
					</Text>

					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<DesktopNav NAV_ITEMS={NAV_ITEMS} />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					spacing={6}>
					<Flex alignItems={"center"}>
						<Menu>
							<MenuButton
								as={Button}
								rounded={"full"}
								variant={"link"}
								cursor={"pointer"}
								minW={0}>
								<Avatar size={"sm"} name={user.name} />
							</MenuButton>
							<MenuList>
								<MenuItem as={"a"} href="/dashboard/settings">
									Settings
								</MenuItem>
								<MenuDivider />
								<MenuItem onClick={() => handleLogOut()}>Log out</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav NAV_ITEMS={NAV_ITEMS} />
			</Collapse>
		</Box>
	);
}

const DesktopNav = ({ NAV_ITEMS }) => {
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const popoverContentBgColor = useColorModeValue("white", "gray.800");

	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<Link
								p={2}
								href={navItem.href ?? "#"}
								fontSize={"sm"}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: "none",
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={"xl"}
								bg={popoverContentBgColor}
								p={4}
								rounded={"xl"}
								minW={"sm"}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }) => {
	return (
		<Link
			href={href}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: useColorModeValue("blue.50", "gray.900") }}>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text
						transition={"all .3s ease"}
						_groupHover={{ color: "blue.400" }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{ opacity: "100%", transform: "translateX(0)" }}
					justify={"flex-end"}
					align={"center"}
					flex={1}>
					<Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = ({ NAV_ITEMS }) => {
	return (
		<Stack
			bg={useColorModeValue("white", "gray.800")}
			p={4}
			display={{ md: "none" }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? "#"}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue("gray.600", "gray.200")}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={"all .25s ease-in-out"}
						transform={isOpen ? "rotate(180deg)" : ""}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={"solid"}
					borderColor={useColorModeValue("gray.200", "gray.700")}
					align={"start"}>
					{children &&
						children.map((child) => (
							<Link key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

function getNavItems({ role }) {
	switch (role) {
		case "customer":
			return CUSTOMER_ITEMS;
		case "expert":
			return EXPERT_ITEMS;
		case "manager":
			return MANAGER_ITEMS;
		default:
			return [];
	}
}

const CUSTOMER_ITEMS = [
	{
		label: "My Tickets",
		href: "/dashboard/tickets",
	},
	{
		label: "My Products",
		children: [
			{
				label: "Manage my products",
				subLabel: "Manage and add a warranty to your products",
				href: "/dashboard/products",
			},
			{
				label: "Check a warranty",
				subLabel: "Check if you're still covered by a warranty",
				href: "#",
			},
		],
	},
];

const EXPERT_ITEMS = [
	{
		label: "Assigned Tickets",
		href: "/dashboard/tickets",
	},
];

const MANAGER_ITEMS = [
	{
		label: "Tickets",
		href: "/dashboard/tickets",
	},
	{
		label: "Products",
		children: [
			{
				label: "Manage products catalogue",
				subLabel: "Manage and add products",
				href: "/dashboard/products",
			},
			{
				label: "Check a warranty",
				subLabel: "Check if a product is covered by a warranty",
				href: "#",
			},
		],
	},
	{
		label: "Experts",
		href: "/dashboard/experts",
	},
];
