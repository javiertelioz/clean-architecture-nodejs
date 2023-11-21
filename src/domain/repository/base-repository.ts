/**
 * Interface for write operations
 */
export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(id: string | number, item: Partial<T>): Promise<boolean>;
  remove(id: string | number): Promise<boolean>;
}

/**
 * Interface for read operations
 */
export interface IRead<T> {
  get(id: string | number): Promise<T | null>;
  find(filters: any, pagination: Pagination): Promise<Collection<T>>;
}

/**
 * Pagination interface
 */
export interface Pagination {
  offset: number;
  limit: number;
}

/**
 * Collection interface representing a paginated result
 */
export interface Collection<T> {
  count: number;
  records: T[];
}

/**
 * Base Repository Interface combining IWrite and IRead
 */
export interface BaseRepository<T> extends IWrite<T>, IRead<T> {}
