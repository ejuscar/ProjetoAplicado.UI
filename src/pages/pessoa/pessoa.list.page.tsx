import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPaginationResponse } from "../../models/http/httpResponse";
import PessoaService from "../../services/pessoa.service";
import CustomTable, {
	Column,
} from "../../components/custom-table/custom-table.component";
import EnumTipoPessoa from "../../models/enums/enumTipoPessoa";
import Pessoa from "../../models/entities/pessoa";

const columns: Column[] = [
	{ id: "id", label: "Id" },
	{ id: "nome", label: "Nome" },
	{
		id: "tipo",
		label: "Tipo",
		format: (value: number) => EnumTipoPessoa[value],
	},
	{
		id: "ativo",
		label: "Ativo",
		formatBool: (value: boolean) => (value ? "Sim" : "Não"),
	},
];

export default function PessoaListPage() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [paginationData, setPaginationData] = useState<
		IPaginationResponse<Pessoa> | null | undefined
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
		PessoaService.remove(id).then((response) => {
			if (response.success) {
				if (paginationData?.items.length === 1 && page > 0)
					setPage(page - 1);
				else getData(page, rowsPerPage);
			}
		});
	};

	const handleInsert = () => {
		navigate("incluir");
	};

	function getData(page: number, rowsPerPage: number) {
		PessoaService.getAll(page + 1, rowsPerPage).then((response) => {
			if (response.success) {
				setPaginationData(response.data);
			}
		});
	}

	useEffect(() => {
		getData(page, rowsPerPage);
	}, [page, rowsPerPage]);

	return (
		<>
			<h2 className="title">Busca de Pessoas</h2>
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
		</>
	);
}
