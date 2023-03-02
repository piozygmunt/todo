export interface ArchivedTodosQuery {
  requestedPage?: number;
  pageSize?: number;
  sortBy?: SortBy;
  direction?: Direction;

}

export enum SortBy {
  DESCRIPTION = "DESCRIPTION",
  CREATION_DATE = "CREATION_DATE",
  STATUS = "STATUS"
}

export enum Direction {
  ASC = "ASC",
  DESC = "DESC"
}
