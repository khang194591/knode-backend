import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { Member } from './member.entity';
import { Project } from './project.entity';
import { Role } from './role.entity';

@Entity('organizations')
export class Organization extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  defaultRoleId: Nullable<string>;

  @OneToMany(() => Member, (member) => member.organization)
  members: Relation<Member[]>;

  @OneToMany(() => Role, (role) => role.organization)
  roles: Relation<Role[]>;

  @OneToMany(() => Project, (project) => project.organization)
  projects: Relation<Project[]>;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'defaultRoleId' })
  defaultRole: Nullable<Relation<Role>>;
}
