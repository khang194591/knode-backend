import { IsOptional, IsUUID } from 'class-validator';

export class GetListRoleQueryDto {
  @IsOptional()
  @IsUUID()
  organizationId?: string;
}
