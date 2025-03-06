import { IsNumber, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  page: number = 1;

  @IsNumber()
  @IsPositive()
  pageSize: number = 10;
}

export class PaginationResDto {
  constructor(data: PaginationDto) {
    Object.assign(this, data);
  }

  page: number;

  pageSize: number;

  total: number;
}
