import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { uuidPlugin } from 'src/core/plugins';
import { TokenType } from 'src/auth/enum';
import { AllConfigType } from 'src/core/config';
import { CryptoService } from 'src/crypto/crypto.service';
import { User } from 'src/users/entities';
import { PermissionCacheService } from 'src/permissions/permission-cache.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AllConfigType, true>,
    private readonly cryptoService: CryptoService,
    private readonly permissionCacheService: PermissionCacheService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const userGroupId = user.group.id;
    const permissionsVersion =
      this.permissionCacheService.getGroupPermissionsVersion(userGroupId);

    const payload = {
      userId: user.id,
      userGroupId: user.group.id,
      permissionsVersion,
      type: TokenType.access_token,
    };

    const jwtid = uuidPlugin.v7();
    const secret = this.configService.get<string>('auth.accessTokenSecret', {
      infer: true,
    });

    const expiresIn = this.configService.get('auth.accessTokenExpiresIn', {
      infer: true,
    });

    return this.jwtService.signAsync(payload, { jwtid, secret, expiresIn });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload = {
      userId: user.id,
      type: TokenType.refresh_token,
    };

    const jwtid = uuidPlugin.v7();
    const secret = this.cryptoService.decipher(user.encryptedTokenSecret);

    const expiresIn = this.configService.get('auth.refreshTokenExpiresIn', {
      infer: true,
    });

    return this.jwtService.signAsync(payload, { jwtid, secret, expiresIn });
  }
}
