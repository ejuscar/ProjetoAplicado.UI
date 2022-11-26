import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import NavBarComponent from "./components/nav-bar/nav-bar.component";

import "./index.css";
import router from "./routes/router";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<NavBarComponent />
		<RouterProvider router={router} />
	</React.StrictMode>
);
