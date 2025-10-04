import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CryptoService } from 'src/crypto/crypto.service';

Module({
  providers: [CryptoService],
  imports: [ConfigModule],
  exports: [CryptoService],
});
export class CryptoModule {}
