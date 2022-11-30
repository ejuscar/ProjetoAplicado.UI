import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FluxoCaixa from "../../models/entities/fluxoCaixa";
import EnumTipoFluxo from "../../models/enums/enumTipoFluxo";
import { IPaginationResponse } from "../../models/http/httpResponse";
import FluxoCaixaService from "../../services/fluxo-de-caixa.service";
import CustomTable, {
	Column,
} from "../../components/custom-table/custom-table.component";

const columns: Column[] = [
	{ id: "id", label: "Id" },
	{ id: "descricao", label: "Descrição", minWidth: 300 },
	{
		id: "tipo",
		label: "Tipo",
		format: (value: number) => EnumTipoFluxo[value],
	},
	{
		id: "valor",
		label: "Valor",
		format: (value: number) =>
			new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			}).format(value),
	},
	{
		id: "categoria",
		label: "Categoria",
	},
	{
		id: "numeroParcela",
		label: "Parcela",
	},
	{
		id: "data",
		label: "Data",
		formatString: (date: string) =>
			new Date(date).toLocaleDateString("pt-BR"),
	},
];

export default function FluxoDeCaixaListPage() {
	const [paginationData, setPaginationData] = useState<
		IPaginationResponse<FluxoCaixa> | null | undefined
	>({
		currentPage: 1,
		hasNext: false,
		hasPrevious: false,
		items: [],
		pageSize: 10,
		totalCount: 0,
		totalPages: 0,
	});

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const navigate = useNavigate();

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleEdit = (element: FluxoCaixa) => {
		navigate("/");
	};

	const handleInsert = () => {
		navigate("incluir");
	};

	useEffect(() => {
		FluxoCaixaService.getAll(page + 1, rowsPerPage).then((response) => {
			if (response.success) {
				setPaginationData(response.data);
			}
		});
	}, [page, rowsPerPage]);

	return (
		<>
			<h2 className="title">Busca de Fluxo de Caixa</h2>
			<div className="container">
				<button
					type="button"
					className="btn btn-primary"
					style={{ margin: "0 0 20px 0" }}
					onClick={handleInsert}
				>
					Incluir
				</button>

				<CustomTable
					columns={columns}
					paginationData={paginationData}
					onPageChange={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					onEdit={handleEdit}
				/>
			</div>
		</>
	);
}
