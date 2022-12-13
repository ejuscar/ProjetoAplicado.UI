export interface IHttpServiceResponse<T> {
	success: boolean;
	errorMessage: string | undefined;
	data: T | undefined;
}

export interface IPaginationResponse<T> {
	totalCount: number;
	pageSize: number;
	currentPage: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
	items: T[];
}
