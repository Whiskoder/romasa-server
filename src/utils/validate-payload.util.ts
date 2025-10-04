import { plainToInstance } from 'class-transformer';
import { IsEnum, isObject, IsString, IsUUID, validate } from 'class-validator';

import { TokenType } from 'src/auth/enum';

class PayloadVariableValidator {
  @IsString()
  @IsUUID('7')
  sub: string;

  @IsString()
  @IsUUID('7')
  jti: string;

  @IsEnum(TokenType)
  type: TokenType;
}

async function validatePayload(dto: unknown): Promise<boolean> {
  if (!isObject(dto)) return false;

  const payload = plainToInstance(PayloadVariableValidator, dto);
  const errors = await validate(payload);
  return errors.length === 0;
}

export default validatePayload;
