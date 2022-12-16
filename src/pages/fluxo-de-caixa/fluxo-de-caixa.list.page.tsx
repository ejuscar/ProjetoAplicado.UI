import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FluxoCaixa from "../../models/entities/fluxoCaixa";
import EnumTipoFluxo from "../../models/enums/enumTipoFluxo";
import { IPaginationResponse } from "../../models/http/httpResponse";
import FluxoCaixaService from "../../services/fluxo-de-caixa.service";
import CustomTable, {
	Column,
} from "../../components/custom-table/custom-table.component";
import AlertMessage from "../../helpers/alertMessages";

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
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [paginationData, setPaginationData] = useState<
		IPaginationResponse<FluxoCaixa> | null | undefined
	>({
		currentPage: 1,
		hasNext: false,
		hasPrevious: false,
		items: [],
		pageSize: rowsPerPage,
		totalCount: 0,
		totalPages: 0,
	});

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

	const handleEdit = (id: string) => {
		navigate(`editar/${id}`);
	};

	const handleRemove = (id: string) => {
		AlertMessage.confirmRemoveItem().then((response) => {
			if (response.isConfirmed) {
				FluxoCaixaService.remove(id).then((response) => {
					if (response.success) {
						if (paginationData?.items.length === 1 && page > 0)
							setPage(page - 1);
						else getData(page, rowsPerPage);

						AlertMessage.showRemoveSuccess();
					}
				});
			}
		});
	};

	const handleInsert = () => {
		navigate("incluir");
	};

	function getData(page: number, rowsPerPage: number) {
		FluxoCaixaService.getAll(page + 1, rowsPerPage).then(
			(response) => {
				if (response.success) setPaginationData(response.data);
				else AlertMessage.showError(response.errorMessage);
			},
			(error) => {
				AlertMessage.showError(error);
			}
		);
	}

	useEffect(() => {
		getData(page, rowsPerPage);
	}, [page, rowsPerPage]);

	return (
		<div className="app-container">
			<h2 className="title">Lista de Fluxo de Caixa</h2>
			<div>
				<button
					type="button"
					className="btn btn-primary"
					style={{ margin: "0 0 20px 0" }}
					onClick={handleInsert}
				>
					Incluir
				</button>

				<CustomTable
					rowsPerPage={rowsPerPage}
					currentPage={page}
					columns={columns}
					paginationData={paginationData}
					onPageChange={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					onEdit={handleEdit}
					onRemove={handleRemove}
				/>
			</div>
		</div>
	);
}
