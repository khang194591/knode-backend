import { Project } from 'src/modules/projects/entities/project.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

@Entity('organizations')
export class Organization extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  defaultRoleId: Nullable<number>;

  @OneToMany(() => User, (user) => user.organization)
  users: Relation<User[]>;

  @OneToMany(() => Role, (role) => role.organization)
  roles: Relation<Role[]>;

  @OneToMany(() => Project, (project) => project.organization)
  projects: Relation<Project[]>;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'defaultRoleId' })
  defaultRole: Nullable<Relation<Role>>;
}
