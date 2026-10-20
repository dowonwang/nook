export interface OffsetPaginationQuery {
  page?: number;
  limit?: number;
}

export interface CursorPaginationQuery {
  cursor?: string;
  limit?: number;
}
