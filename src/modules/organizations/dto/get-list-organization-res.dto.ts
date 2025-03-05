import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class GetListOrganizationResDto {
  @Expose()
  @Type(() => GetOrganizationResDto)
  data: GetOrganizationResDto[];

  @Expose()
  total: number;
}

@Exclude()
export class GetOrganizationResDto {
  @Expose()
  name: string;
}
