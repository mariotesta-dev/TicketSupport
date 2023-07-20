import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import { Toaster } from "react-hot-toast";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

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
		element: <Dashboard />,
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
