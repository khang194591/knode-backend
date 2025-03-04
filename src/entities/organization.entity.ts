import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

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
