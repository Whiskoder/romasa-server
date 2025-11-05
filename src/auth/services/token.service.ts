import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { uuidPlugin } from 'src/core/plugins';
import { TokenType } from 'src/auth/enum';
import { AllConfigType } from 'src/core/config';
import { CryptoService } from 'src/crypto/crypto.service';
import { User } from 'src/users/entities/user.entity';
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
    let permissionsVersion;

    if (user.group) {
      permissionsVersion =
        this.permissionCacheService.getGroupPermissionsVersion(user.group.id);
    }

    const payload = {
      userId: user.id,
      userGroupId: user.group?.id,
      isSuperAdmin: user.isSuperAdmin,
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

  async generateRegisterToken(
    employeeId: number,
    email: string,
  ): Promise<string> {
    const payload = {
      employeeId,
      email,
      type: TokenType.register_token,
    };

    const jwtid = uuidPlugin.v7();
    const secret = this.configService.get<string>('auth.registerTokenSecret', {
      infer: true,
    });

    const expiresIn = this.configService.get('auth.registerTokenExpiresIn', {
      infer: true,
    });

    return this.jwtService.signAsync(payload, { jwtid, secret, expiresIn });
  }
}
