import { createBrowserRouter } from "react-router-dom";
import FluxoDeCaixaFormPage from "../pages/fluxo-de-caixa/fluxo-de-caixa.form.page";
import FluxoDeCaixaListPage from "../pages/fluxo-de-caixa/fluxo-de-caixa.list.page";
import HomePage from "../pages/home.page";
import PessoaFormPage from "../pages/pessoa/pessoa.form.page";
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
		path: "/pessoas/incluir",
		element: <PessoaFormPage />,
	},
	{
		path: "/pessoas/editar/:id",
		element: <PessoaFormPage />,
	},
	{
		path: "/fluxo-de-caixa",
		element: <FluxoDeCaixaListPage />,
	},
	{
		path: "/fluxo-de-caixa/incluir",
		element: <FluxoDeCaixaFormPage />,
	},
	{
		path: "/fluxo-de-caixa/editar/:id",
		element: <FluxoDeCaixaFormPage />,
	},
]);

export default router;
