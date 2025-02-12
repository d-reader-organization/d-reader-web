export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortOption<T> {
  order: SortOrder
  value: T
  label: string
}
