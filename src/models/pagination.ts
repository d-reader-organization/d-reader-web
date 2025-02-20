export type Pagination = {
  skip: number
  take: number
}

export type PaginatedResponse<T> = {
  totalItems: number
  data: T[]
}
