import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./app.css";

export default function App() {
	return (
		<main>
			<RouterProvider router={router} />
		</main>
	);
}
