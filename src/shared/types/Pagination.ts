export interface PaginationParams {
  PageNumber: number;
  PageSize: number;
}

export interface SearchParams {
  Query: string;
}

export interface SortingParams {
  Sort: string;
  Order: "asc" | "desc";
}

type BaseGetParams = PaginationParams & SearchParams & SortingParams;

export type GetParams = Partial<BaseGetParams>;
