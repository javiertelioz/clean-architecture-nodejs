import { Paginate, Pagination } from '../../src/interfaces/web/pagination';
import UserSerializer from '../../src/interfaces/web/serializers/user/user-serializer';

describe('Paginate', () => {
  it('should return a paginated response object', () => {
    const data = {
      count: 50,
      records: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
    const currentPage = 2;
    const limit = 20;
    const serializer = UserSerializer.getInstance();

    const result = Paginate(data, serializer, currentPage, limit);

    expect(result).toEqual({
      currentPage,
      totalPages: Math.ceil(data.count / limit),
      total: data.count,
      records: data.records,
    });
  });

  it('should calculate correct limit and offset', () => {
    const page = 2;
    const pageSize = 10;
    const result = Pagination(page, pageSize);

    expect(result).toEqual({
      limit: pageSize,
      offset: 10, // (2 - 1) * 10
    });
  });

  it('should default to first page with default page size when no arguments are provided', () => {
    const result = Pagination();

    expect(result).toEqual({
      limit: 20, // Default page size
      offset: 0, // First page
    });
  });
});
