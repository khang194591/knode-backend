import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  defaultRoleId?: string;
}
