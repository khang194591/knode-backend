import { Attachment } from 'src/modules/attachments/entities/attachment.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Milestone } from 'src/modules/milestones/entities/milestone.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

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
  milestoneId: number;

  @Column({ nullable: true })
  assignedToId: Nullable<number>;

  @Column({ nullable: true })
  dependsOnId: Nullable<number>;

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
