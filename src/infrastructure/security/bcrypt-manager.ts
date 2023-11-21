import bcrypt from 'bcrypt';

import { CryptoManager } from '../../application/security/crypto-manager';

export default class BcryptManager implements CryptoManager {
  hash(data: string): string {
    return bcrypt.hashSync(data, process.env.SALTORROUNDS || 10);
  }

  compare(plain: string, hashed: string): boolean {
    return bcrypt.compareSync(plain, hashed);
  }
}
