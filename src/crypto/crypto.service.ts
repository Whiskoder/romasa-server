import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  scrypt,
} from 'crypto';
import { promisify } from 'util';

import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class CryptoService implements OnModuleInit {
  private logger: Logger;
  private encriptionKey: Buffer;
  private hashSalt: string;
  private readonly ivSize: number = 16;

  constructor(
    private readonly configService: ConfigService<AllConfigType, true>,
  ) {}

  async onModuleInit() {
    const hashSalt = this.configService.get<string>('crypto.hashSalt', {
      infer: true,
    });
    const encryptionSecret = this.configService.get<string>('crypto.secret', {
      infer: true,
    });

    this.logger = new Logger(CryptoService.name);
    this.hashSalt = hashSalt;
    this.encriptionKey = (await promisify(scrypt)(
      encryptionSecret,
      'salt',
      32,
    )) as Buffer;
  }

  hash(data: string, salt?: string): Buffer {
    const hash = createHash('sha256')
      .update(salt + data)
      .digest();
    return hash;
  }

  hashEmail(data: string): Buffer {
    return this.hash(data, this.hashSalt);
  }

  cipher(data: string | Buffer): Buffer {
    try {
      const iv = randomBytes(this.ivSize);
      const cipher = createCipheriv('aes-256-ctr', this.encriptionKey, iv);
      const ciphered = Buffer.concat([cipher.update(data), cipher.final()]);
      return Buffer.concat([iv, ciphered]);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException('Error encrypting data');
    }
  }

  decipher(data: Buffer): string {
    try {
      const iv = data.subarray(0, this.ivSize);
      const ciphered = data.subarray(this.ivSize);
      const decipher = createDecipheriv('aes-256-ctr', this.encriptionKey, iv);
      return Buffer.concat([
        decipher.update(ciphered),
        decipher.final(),
      ]).toString();
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException('Error decrypting data');
    }
  }

  generateSecret(): Buffer {
    const salt = randomBytes(16);
    const secret = randomBytes(32);
    const data = Buffer.concat([salt, secret]);
    return this.cipher(data);
  }
}
