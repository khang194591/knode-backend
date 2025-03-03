import { Organization } from 'src/modules/organizations/entities/organization.entity';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/core/database/base.entity';
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
