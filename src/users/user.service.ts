import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CryptoService } from 'src/crypto/crypto.service';
import { User } from 'src/users/entities';
import { bcryptPlugin, uuidPlugin } from 'src/plugins';
import { Roles } from 'src/users/enums';

interface CreateUserOpts {
  email: string;
  password: string;
  role: Roles;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(opts: CreateUserOpts): Promise<User> {
    const { email, password, role } = opts;
    const $email = email.toLowerCase().trim();
    const $password = password.trim();

    const hashedPassword = bcryptPlugin.hash($password);
    const encryptedTokenSecret = this.cryptoService.generateSecret();

    const newUserEntity = this.userRepository.create({
      id: uuidPlugin.v7(),
      hashedPassword,
      encryptedTokenSecret,
      email: $email,
      role,
    });

    await this.userRepository.save(newUserEntity);
    return newUserEntity;
  }

  //   await this.userRepository.save(newUserEntity);
  //   return newUserEntity;
  // }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const {
  //     email: $email,
  //     password,
  //     firstName: $firstName,
  //     lastName: $lastName,
  //   } = createUserDto;

  //   const firstName = $firstName.toLowerCase().trim();
  //   const lastName = $lastName.toLowerCase().trim();
  //   const email = $email.toLowerCase().trim();

  //   const hashedPassword = bcryptPlugin.hash(password);
  //   const hashedEmail = this.cryptoService.hashEmail(email);
  //   const cipheredEmail = this.cryptoService.cipher(email);
  //   const cipheredTokenSecret = this.cryptoService.generateSecret();
  //   const ciphered2FASecret = this.cryptoService.generateSecret();

  //   const userEntity = this.userRepository.create({
  //     hashedPassword,
  //     hashedEmail,
  //     firstName,
  //     lastName,
  //     cipheredEmail,
  //     cipheredTokenSecret,
  //     ciphered2FASecret,
  //   });
  //   await this.userRepository.save(userEntity);

  //   return userEntity;
  // }

  async findById(id: string, relations?: string[]): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { id, isActive: true },
      relations,
    });

    // if (!userEntity) throw new NotFoundException('User not found');

    return userEntity;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { email, isActive: true },
    });

    // if (!userEntity) throw new NotFoundException('User not found');

    return userEntity;
  }

  // async findById(
  //   @Param('id', new ParseUUIDPipe({ version: '7' })) id: string,
  //   relations?: UserRelations[],
  // ): Promise<User> {
  //   const userEntity = await this.userRepository.findOne({
  //     where: { id },
  //     relations,
  //   });

  //   if (!userEntity) throw new BadRequestException('User not found');

  //   return userEntity;
  // }

  // async findByEmail(email: string, relations?: UserRelations[]): Promise<User> {
  //   const hashedEmail = this.cryptoService.hashEmail(email);
  //   const userEntity = await this.userRepository.findOne({
  //     where: { hashedEmail },
  //     relations,
  //   });

  //   if (!userEntity) throw new BadRequestException('User not found');

  //   return userEntity;
  // }

  // async changePassword(userEntity: User, newPassword: string): Promise<User> {
  //   const hashedPassword = bcryptPlugin.hash(newPassword);
  //   userEntity.hashedPassword = hashedPassword;
  //   await this.userRepository.save(userEntity);
  //   return userEntity;
  // }

  // async rotateTokenSecret(userEntity: User): Promise<User> {
  //   const secret = this.cryptoService.generateSecret();
  //   userEntity.cipheredTokenSecret = secret;
  //   await this.userRepository.save(userEntity);
  //   return userEntity;
  // }
}
