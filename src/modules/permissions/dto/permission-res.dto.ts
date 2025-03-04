import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PermissionResDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: Nullable<string>;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
