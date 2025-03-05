import { PaginationDto } from '@/shared/dto';
import { IsOptional, IsString } from 'class-validator';

export class GetListOrganizationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}
