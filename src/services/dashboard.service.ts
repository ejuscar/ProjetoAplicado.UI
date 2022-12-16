import { IHttpServiceResponse } from "../models/http/httpResponse";
import { URL_API } from "../helpers/consts";
import {
	AtividadeMembrosDashboardModel,
	EvolucaoMembrosDashboardModel,
	TimelineSaldoDashboardModel,
} from "../models/components/dashboard.model";

const BASE_URL = `${URL_API}/dashboard`;

async function getAtividadeMembros(): Promise<
	IHttpServiceResponse<AtividadeMembrosDashboardModel>
> {
	const response = await fetch(`${BASE_URL}/atividademembros`);
	return await response.json();
}

async function getEvolucaoMembrosByYear(
	year: number
): Promise<IHttpServiceResponse<EvolucaoMembrosDashboardModel>> {
	const response = await fetch(`${BASE_URL}/evolucaomembros?year=${year}`);
	return await response.json();
}

async function getTimelineSaldoByYear(
	year: number
): Promise<IHttpServiceResponse<TimelineSaldoDashboardModel>> {
	const response = await fetch(`${BASE_URL}/timelinesaldo?year=${year}`);
	return await response.json();
}

const ENDPOINTS = {
	getAtividadeMembros,
	getEvolucaoMembrosByYear,
	getTimelineSaldoByYear,
};

export default ENDPOINTS;
