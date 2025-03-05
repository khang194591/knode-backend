import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Attachment } from './attachment.entity';
import { BaseEntity } from './base.entity';
import { Comment } from './comment.entity';
import { Member } from './member.entity';
import { Task } from './task.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Member, (profile) => profile.user)
  profiles: Relation<Member[]>;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Relation<Comment[]>;

  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks: Relation<Task[]>;

  @OneToMany(() => Attachment, (attachment) => attachment.uploadedBy)
  attachments: Relation<Attachment[]>;
}
