import { IHttpServiceResponse, IPaginationResponse } from "../models/http/httpResponse";
import FluxoCaixa from "../models/entities/fluxoCaixa";

const URL_API = "https://localhost:7211/fluxocaixa";

async function getAll(pageIndex: number, pageSize: number): Promise<IHttpServiceResponse<IPaginationResponse<FluxoCaixa>>> {
	const response = await fetch(`${URL_API}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    return await response.json();
}

export default {
	getAll,
};
