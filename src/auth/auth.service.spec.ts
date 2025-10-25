// describe('AuthService', () => {
//   it('should be defined', () => {
//     expect(true).toBeTruthy();
// 	});

// 	it('should login user', () => {

// 	})
// });

import { Response } from 'express';
import { bcryptPlugin } from 'src/core/plugins';
import { uuidPlugin } from 'src/core/plugins';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CookieService, TokenService } from './services';
import { Test, TestingModule } from '@nestjs/testing';

export class TestFactories {
  static createUser(overrides?: Partial<User>): User {
    const user = new User();

    user.id = uuidPlugin.v7();
    user.email = 'test@test.com';
    user.hashedPassword = bcryptPlugin.hash('contraseña123', 10);
    user.isActive = true;
    user.isSuperAdmin = false;
    user.encryptedTokenSecret = Buffer.from('encrypted-secret');
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return Object.assign(user, overrides);
  }

  static createLoginDto() {
    return {
      email: 'test@test.com',
      password: 'contraseña123',
    };
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let cookieService: jest.Mocked<CookieService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findById: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
        {
          provide: CookieService,
          useValue: {
            setTokenCookie: jest.fn(),
            clearAuthCookies: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {
            generateAccessToken: jest.fn(),
            generateRefreshToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    cookieService = module.get(CookieService);
    tokenService = module.get(TokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AuthService.login', () => {
    let mockResponse: Partial<Response>;

    beforeEach(() => {
      mockResponse = {
        cookie: jest.fn(),
      };
    });

    it('should login user successfully with valid credentials', async () => {
      // Arrange
      const loginDto = TestFactories.createLoginDto();
      const mockUser = TestFactories.createUser({
        email: loginDto.email,
        hashedPassword: bcryptPlugin.hash(loginDto.password, 10),
      });
      const mockAccessToken = 'mock-access-token';
      const mockRefreshToken = 'mock-refresh-token';

      usersService.findByEmail.mockResolvedValue(mockUser);
      tokenService.generateAccessToken.mockResolvedValue(mockAccessToken);
      tokenService.generateRefreshToken.mockResolvedValue(mockRefreshToken);

      jest.spyOn(bcryptPlugin, 'compare').mockReturnValue(true);

      // Act
      const result = await service.login(loginDto, mockResponse as Response);

      // Assert
      expect(result).toEqual(mockUser);
    });
  });
});
