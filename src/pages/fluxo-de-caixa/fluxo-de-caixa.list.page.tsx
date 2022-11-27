import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import FluxoCaixa from "../../models/entities/fluxoCaixa";
import EnumTipoFluxo from "../../models/enums/enumTipoFluxo";
import { IPaginationResponse } from "../../models/http/httpResponse";
import FluxoCaixaService from "../../services/fluxo-de-caixa.service";

interface Column {
	id:
		| "id"
		| "descricao"
		| "tipo"
		| "valor"
		| "categoria"
		| "numeroParcela"
		| "data";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
	formatString?: (date: string) => string;
}

const columns: readonly Column[] = [
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

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => {
		FluxoCaixaService.getAll(page + 1, rowsPerPage).then((response) => {
			if (response.success) {
				setPaginationData(response.data);
			}
		});
	}, [page, rowsPerPage]);

	return (
		<Paper sx={{ width: "100%", overflow: "auto" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell
								key={99}
								align="left"
								style={{
									position: "sticky",
									left: 0,
									backgroundColor: "white",
									zIndex: 999,
								}}
							>
								Ações
							</TableCell>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{paginationData?.items.map((row) => {
							return (
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={row.id}
								>
									<TableCell
										key={999}
										align="left"
										style={{
											position: "sticky",
											left: 0,
											backgroundColor: "white",
											zIndex: 999,
										}}
									>
										Eiita
									</TableCell>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell
												key={column.id}
												align={column.align}
											>
												{column.format &&
												typeof value === "number"
													? column.format(value)
													: column.formatString &&
													  typeof value === "string"
													? column.formatString(value)
													: value.toString()}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={paginationData ? paginationData.totalCount : 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
