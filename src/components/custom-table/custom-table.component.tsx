import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { IPaginationResponse } from "../../models/http/httpResponse";

export interface Column {
	id: string;
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
	formatBool?: (value: boolean) => string;
	formatString?: (date: string) => string;
}

interface ITableProps {
	rowsPerPage: number;
	currentPage: number;
	onPageChange: (event: unknown, newPage: number) => void;
	onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onEdit: (id: string) => void;
	onRemove: (id: string) => void;
	paginationData: IPaginationResponse<any> | null | undefined;
	columns: Column[];
}

export default function CustomTable({
	rowsPerPage,
	currentPage,
	paginationData,
	columns,
	onPageChange,
	onChangeRowsPerPage,
	onEdit,
	onRemove,
}: ITableProps) {
	function formatValue(column: any, value: any): string {
		console.log(`${value} ${typeof value}`);

		if (column.format && typeof value === "number")
			return column.format(value);

		if (column.formatString && typeof value === "string")
			return column.formatString(value);

		if (column.formatBool && typeof value === "boolean")
			return column.formatBool(value);

		return value.toString();
	}
	return (
		<Paper sx={{ width: "100%", overflow: "auto" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell
								key={99}
								align="center"
								style={{
									position: "sticky",
									left: 0,
									backgroundColor: "white",
									zIndex: 999,
									width: 115,
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
										align="center"
										style={{
											position: "sticky",
											left: 0,
											backgroundColor: "white",
											zIndex: 999,
										}}
									>
										<button
											type="button"
											className="btn btn-link"
											title="Editar"
											onClick={() => onEdit(row.id)}
										>
											<FontAwesomeIcon
												icon={faPenToSquare}
											/>
										</button>

										<button
											type="button"
											className="btn btn-link"
											title="Remover"
											onClick={() => onRemove(row.id)}
										>
											<FontAwesomeIcon
												icon={faTrashCan}
											/>
										</button>
									</TableCell>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell
												key={column.id}
												align={column.align}
											>
												{formatValue(column, value)}
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
				rowsPerPageOptions={[5, 10, 25, 50, 100]}
				component="div"
				count={paginationData ? paginationData.totalCount : 0}
				rowsPerPage={rowsPerPage}
				page={currentPage}
				onPageChange={onPageChange}
				onRowsPerPageChange={onChangeRowsPerPage}
			/>
		</Paper>
	);
}
