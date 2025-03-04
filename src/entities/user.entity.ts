import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { Attachment } from './attachment.entity';
import { BaseEntity } from './base.entity';
import { Comment } from './comment.entity';
import { Organization } from './organization.entity';
import { Role } from './role.entity';
import { Task } from './task.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  organizationId: Nullable<number>;

  @Column({ nullable: true })
  roleId: Nullable<number>;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Relation<Comment[]>;

  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks: Relation<Task[]>;

  @OneToMany(() => Attachment, (attachment) => attachment.uploadedBy)
  attachments: Relation<Attachment[]>;

  @ManyToOne(() => Organization, (organization) => organization.users)
  @JoinColumn({ name: 'organizationId' })
  organization: Nullable<Relation<Organization>>;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Nullable<Relation<Role>>;
}
