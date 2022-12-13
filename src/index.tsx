import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import NavBar from "./components/nav-bar/nav-bar.component";

import "./index.css";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	// <React.StrictMode>
	<>
		<NavBar />
		<App />
	</>
	// </React.StrictMode>
);
