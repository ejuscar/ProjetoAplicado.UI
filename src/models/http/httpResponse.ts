export interface IHttpServiceResponse<T> {
	success: boolean;
	errorMessage: string | undefined | null;
	data: T | undefined | null;
}

export interface IPaginationResponse<T> {
	totalCount: number;
	pageSize: number;
	currentPage: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
	items: T[]
}
