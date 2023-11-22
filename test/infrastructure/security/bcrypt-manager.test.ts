import bcrypt from 'bcrypt';

import BcryptManager from '../../../src/infrastructure/security/bcrypt-manager';

describe('BcryptManager', () => {
  let bcryptManager: BcryptManager;

  beforeEach(() => {
    bcryptManager = new BcryptManager();
  });

  describe('hash', () => {
    it('should hash a given string', () => {
      // Given
      const data = 'myPassword123';
      const spy = jest.spyOn(bcrypt, 'hashSync');

      // When
      const hashed = bcryptManager.hash(data);

      // Then
      expect(spy).toHaveBeenCalledWith(data, expect.anything());
      expect(hashed).toBeDefined();
      expect(typeof hashed).toBe('string');

      spy.mockRestore();
    });
  });

  describe('compare', () => {
    it('should return true when the plain and hashed strings match', () => {
      // Given
      const plain = 'myPassword123';
      const hashed = bcrypt.hashSync(plain, 10);

      // When
      const result = bcryptManager.compare(plain, hashed);

      // Then
      expect(result).toBe(true);
    });

    it('should return false when the plain and hashed strings do not match', () => {
      // Given
      const plain = 'myPassword123';
      const incorrectHash = 'incorrectHash';

      // When
      const result = bcryptManager.compare(plain, incorrectHash);

      // Then
      expect(result).toBe(false);
    });
  });
});
