import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

@Exclude()
export class UserPayloadDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  roleId: string;

  @Expose()
  memberId: string;

  @Expose()
  permissions: string[];

  @Expose()
  organizationId: string;
}

@Exclude()
export class SignInResDto {
  @Expose()
  @Type(() => UserPayloadDto)
  payload: UserPayloadDto;

  @Expose()
  accessToken: string;
}
