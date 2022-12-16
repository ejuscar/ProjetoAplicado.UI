export interface AtividadeMembrosDashboardModel {
	membrosAtivos: number;
	membrosInativos: number;
	total: number;
}

export interface EvolucaoMembrosDashboardModel {
	novosMembros: number[];
	novosVisitantes: number[];
}

export interface TimelineSaldoDashboardModel {
	arrecadacoes: number[];
	gastos: number[];
	saldos: number[];
}
