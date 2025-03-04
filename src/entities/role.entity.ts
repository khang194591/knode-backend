import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column()
  name: string;

  @Column()
  organizationId: number;

  @ManyToOne(() => Organization, (organization) => organization.roles)
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
