import { IsHexadecimal, IsString, Length } from 'class-validator';

export class NonceHeadersDto {
  @IsHexadecimal()
  @IsString()
  @Length(32, 32)
  'x-auth-nonce': string;
}
