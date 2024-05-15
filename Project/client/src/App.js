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
import DashHero from "./components/dashboard/DashHero";
import ProductsDashboard from "./views/ProductsDashboard";
import NewProduct from "./views/NewProduct";
import PaymentView from "./views/PaymentView";
import CreateProduct from "./views/CreateProduct";
import ExpertDashboard from "./views/ExpertDashboard";
import NewExpert from "./views/NewExpert";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/signin",
		element: <SignIn />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
	{
		path: "/dashboard",
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
		children: [
			{
				path: "",
				element: <DashHero />,
			},
			{
				path: "tickets",
				element: <TicketDashboard />,
			},
			{
				path: "tickets/new",
				element: <NewTicket />,
			},
			{
				path: "products",
				element: <ProductsDashboard />,
			},
			{
				path: "products/new",
				element: <NewProduct />,
			},
			{
				path: "products/create",
				element: <CreateProduct />,
			},
			{
				path: "warranty/:ean/payment",
				element: <PaymentView />,
			},
			{
				path: "experts",
				element: <ExpertDashboard />,
			},
			{
				path: "experts/new",
				element: <NewExpert />,
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
