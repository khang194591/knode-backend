import { Attachment } from 'src/modules/attachments/entities/attachment.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Organization } from 'src/modules/organizations/entities/organization.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

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
