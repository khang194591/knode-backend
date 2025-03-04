import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column()
  taskId: string;

  @Column()
  userId: string;

  @ManyToOne(() => Task, (task) => task.comments)
  @JoinColumn({ name: 'taskId' })
  task: Relation<Task>;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}
