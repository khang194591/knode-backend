import { Task } from 'src/modules/tasks/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

@Entity('attachments')
export class Attachment extends BaseEntity {
  @Column()
  fileUrl: string;

  @Column()
  taskId: number;

  @Column()
  uploadedById: number;

  @ManyToOne(() => Task, (task) => task.attachments)
  @JoinColumn({ name: 'taskId' })
  task: Relation<Task>;

  @ManyToOne(() => User, (user) => user.attachments)
  @JoinColumn({ name: 'uploadedById' })
  uploadedBy: Relation<User>;
}
