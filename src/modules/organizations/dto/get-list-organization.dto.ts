import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetListOrganizationDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  search?: string;
}
