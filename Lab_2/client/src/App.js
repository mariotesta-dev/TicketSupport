import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import CreateProfile from "./views/CreateProfile";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{ path: "/createprofile", element: <CreateProfile /> },
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
