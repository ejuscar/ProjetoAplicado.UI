import {
	IHttpServiceResponse,
	IPaginationResponse,
} from "../models/http/httpResponse";
import Pessoa, { PessoaBase } from "../models/entities/pessoa";

const URL_API = "https://localhost:7211/pessoa";

async function getAll(
	pageIndex: number,
	pageSize: number
): Promise<IHttpServiceResponse<IPaginationResponse<Pessoa>>> {
	const response = await fetch(
		`${URL_API}?pageIndex=${pageIndex}&pageSize=${pageSize}`
	);
	return await response.json();
}

async function getById(id: string): Promise<IHttpServiceResponse<Pessoa>> {
	const response = await fetch(`${URL_API}/${id}`);
	return await response.json();
}

async function post(data: PessoaBase): Promise<IHttpServiceResponse<string>> {
	const response = await fetch(`${URL_API}`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return await response.json();
}

async function put(
	id: string,
	data: PessoaBase
): Promise<IHttpServiceResponse<string>> {
	const response = await fetch(`${URL_API}/${id}`, {
		method: "PUT",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return await response.json();
}

async function remove(id: string): Promise<IHttpServiceResponse<string>> {
	const response = await fetch(`${URL_API}/${id}`, {
		method: "DELETE",
	});

	return await response.json();
}

const ENDPOINTS = {
	getAll,
	getById,
	post,
	put,
	remove,
};

export default ENDPOINTS;
