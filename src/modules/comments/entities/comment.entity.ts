import { Task } from 'src/modules/tasks/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column()
  taskId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Task, (task) => task.comments)
  @JoinColumn({ name: 'taskId' })
  task: Relation<Task>;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}
