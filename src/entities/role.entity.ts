import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Relation,
  Unique,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity('roles')
@Unique(['name', 'organizationId'])
export class Role extends BaseEntity {
  @Column()
  name: string;

  @Column()
  organizationId: string;

  @ManyToOne(() => Organization, (organization) => organization.roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organizationId' })
  organization: Relation<Organization>;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'rolePermissions',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' },
  })
  permissions: Relation<Permission[]>;

  @OneToMany(() => User, (user) => user.role)
  users: Relation<User[]>;
}
