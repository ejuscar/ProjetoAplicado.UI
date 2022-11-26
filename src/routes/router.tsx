import { createBrowserRouter } from "react-router-dom";
import FluxoDeCaixaListPage from "../pages/fluxo-de-caixa/fluxo-de-caixa.list.page";
import HomePage from "../pages/home.page";
import PessoaListPage from "../pages/pessoa/pessoa.list.page";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/pessoas",
		element: <PessoaListPage />,
	},
	{
		path: "/fluxo-de-caixa",
		element: <FluxoDeCaixaListPage />,
	},
]);

export default router;
