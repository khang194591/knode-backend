import { IsNumber, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  page: number = 1;

  @IsNumber()
  @IsPositive()
  pageSize: number = 10;
}
