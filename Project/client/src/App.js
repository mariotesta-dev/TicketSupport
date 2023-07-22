import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import TicketDashboard from "./views/TicketDashboard";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { ChakraProvider } from "@chakra-ui/react";
import NewTicket from "./views/NewTicket";

const jwtToken = localStorage.getItem("jwtToken");

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/signin",
		element: <SignIn jwtToken={jwtToken} />,
	},
	{
		path: "/signup",
		element: <SignUp jwtToken={jwtToken} />,
	},
	{
		path: "/dashboard",
		element: (
			<ProtectedRoute jwtToken={jwtToken}>
				<Dashboard />
			</ProtectedRoute>
		),
		children: [
			{
				path: "tickets",
				element: <TicketDashboard />,
			},
			{
				path: "tickets/new",
				element: <NewTicket />,
			},
		],
	},
]);

function App() {
	return (
		<ChakraProvider>
			<Toaster />
			<RouterProvider router={router} />
		</ChakraProvider>
	);
}

export default App;
