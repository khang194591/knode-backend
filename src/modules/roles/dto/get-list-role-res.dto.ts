import { Exclude, Expose, Type } from 'class-transformer';

import { GetRoleResDto } from './get-role-res.dto';

@Exclude()
export class GetListRoleResDto {
  @Expose()
  @Type(() => GetRoleResDto)
  items: GetRoleResDto[];
}
