export interface IMenu {
	nomeMenu: string;
	linkMenu: string;
}

export const MENUS: IMenu[] = [
	{
		nomeMenu: "Home",
		linkMenu: "/",
	},
	{
		nomeMenu: "Pessoa",
		linkMenu: "/pessoas",
	},
	{
		nomeMenu: "Fluxo de Caixa",
		linkMenu: "/fluxo-de-caixa",
	},
];
