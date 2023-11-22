import jwt from 'jsonwebtoken';

import JwtAccessTokenManager from '../../../src/infrastructure/security/jwt-manager';

describe('JwtAccessTokenManager', () => {
  let jwtAccessTokenManager: JwtAccessTokenManager;

  beforeEach(() => {
    jwtAccessTokenManager = new JwtAccessTokenManager();
    process.env.APP_JWT_SECRET = 'testSecret';
  });

  describe('generate', () => {
    it('should generate a valid JWT for a given payload', () => {
      // Given
      const payload = { userId: 1 };

      // When
      const token = jwtAccessTokenManager.generate(payload);

      // Then
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      // Opcional: Verifica la estructura del token
    });
  });

  describe('decode', () => {
    it('should correctly decode a valid JWT', () => {
      // Given
      const payload = { userId: 1 };
      const token = jwt.sign(payload, process.env.APP_JWT_SECRET);

      // When
      const decoded = jwtAccessTokenManager.decode(token);

      // Then
      expect(decoded).toBeDefined();
      expect(decoded).toHaveProperty('userId', 1);
    });

    it('should throw an error for an invalid JWT', () => {
      // Given
      const invalidToken = 'invalidToken';

      // When/Then
      expect(() => {
        jwtAccessTokenManager.decode(invalidToken);
      }).toThrow(jwt.JsonWebTokenError);
    });
  });
});
