import { IPermission } from '@/modules/permissions/enums';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: IPermission;

  @Column({ type: 'varchar', nullable: true })
  description: Nullable<string>;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Relation<Role[]>;
}
