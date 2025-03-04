import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetRoleResDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: Nullable<string>;

  @Expose()
  permissions: string[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
