/**
 * Access Token Manager Interface
 */
export interface CryptoManager {
  hash: (data: string) => string;
  compare: (plain: string, hashed: string) => boolean;
}
