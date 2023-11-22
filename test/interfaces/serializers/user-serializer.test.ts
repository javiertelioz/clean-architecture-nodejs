import UserSerializer from '../../../src/interfaces/web/serializers/user/user-serializer';

describe('UserSerializer', () => {
  describe('Singleton', () => {
    it('should always return the same instance', () => {
      const instance1 = UserSerializer.getInstance();
      const instance2 = UserSerializer.getInstance();

      expect(instance1).toBe(instance2);
    });
  });
});

describe('Serialization', () => {
  const userSerializer = UserSerializer.getInstance();

  it('should throw an error when data is null or undefined', () => {
    expect(() => {
      userSerializer.serialize(null);
    }).toThrow('Data cannot be undefined or null');

    expect(() => {
      userSerializer.serialize(undefined);
    }).toThrow('Data cannot be undefined or null');
  });

  describe('singleSerialize', () => {
    it('should serialize a single entity correctly', () => {
      const user = {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        gender: 'Male',
        email: 'john.doe@example.com',
        createdAt: '2021-01-01T00:00:00.000Z',
      };

      const serialized = userSerializer.singleSerialize(user);

      expect(serialized).toEqual({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        email: 'john.doe@example.com',
        joined: '2021-01-01T00:00:00.000Z',
      });
    });
  });

  it('should serialize an array of entities correctly', () => {
    const users = [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        gender: 'Male',
        email: 'john@example.com',
        createdAt: '2021-01-01',
      },
      {
        id: 2,
        firstname: 'Jane',
        lastname: 'Doe',
        gender: 'Female',
        email: 'jane@example.com',
        createdAt: '2021-01-02',
      },
    ];

    const serialized = userSerializer.serialize(users);

    expect(serialized).toEqual([
      { id: 1, firstName: 'John', lastName: 'Doe', gender: 'Male', email: 'john@example.com', joined: '2021-01-01' },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        gender: 'Female',
        email: 'jane@example.com',
        joined: '2021-01-02',
      },
    ]);
  });
});
