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
import { Milestone } from './milestone.entity';
import { User } from './user.entity';

@Entity('tasks')
export class Task extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: Nullable<string>;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ default: 'TODO' })
  status: string;

  @Column()
  milestoneId: string;

  @Column({ nullable: true })
  assignedToId: Nullable<string>;

  @Column({ nullable: true })
  dependsOnId: Nullable<string>;

  @ManyToOne(() => Milestone, (milestone) => milestone.tasks)
  @JoinColumn({ name: 'milestoneId' })
  milestone: Relation<Milestone>;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'assignedToId' })
  assignedTo: Nullable<Relation<User>>;

  @ManyToOne(() => Task, (task) => task.dependsOn)
  @JoinColumn({ name: 'dependsOnId' })
  dependsOn: Nullable<Relation<Task>>;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Relation<Comment[]>;

  @OneToMany(() => Attachment, (attachment) => attachment.task)
  attachments: Relation<Attachment[]>;
}
