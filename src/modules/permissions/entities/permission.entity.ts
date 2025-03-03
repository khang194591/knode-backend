import { Role } from 'src/modules/roles/entities/role.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Relation<Role[]>;
}
