import { Paginate, Pagination } from '../../src/interfaces/web/pagination';
import { BaseSerializer } from '../../src/interfaces/web/serializers/base-serializer';
import UserSerializer from '../../src/interfaces/web/serializers/user/user-serializer';

describe('Paginate', () => {
  it('should default to first page with default page size when no arguments are provided', () => {
    const result = Pagination();

    expect(result).toEqual({
      limit: 20,
      offset: 0,
    });
  });

  it('should use default values for currentPage and limit if not provided', () => {
    const mockData = {
      count: 50,
      records: Array.from({ length: 50 }, (_, i) => ({ id: i + 1 })),
    };
    const serializer: BaseSerializer = {
      serialize: jest.fn(records => records),
      singleSerialize: jest.fn(records => records),
    };

    const result = Paginate(mockData, serializer);

    expect(result.currentPage).toEqual(1);
    expect(result.total).toEqual(mockData.count);
    expect(result.totalPages).toEqual(Math.ceil(mockData.count / 20)); // Should use the default page size
    expect(serializer.serialize).toHaveBeenCalledWith(mockData.records);
  });

  it('should return a paginated response object', () => {
    const data = {
      count: 20,
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
      offset: 10,
    });
  });
});
