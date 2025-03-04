import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('attachments')
export class Attachment extends BaseEntity {
  @Column()
  fileUrl: string;

  @Column()
  taskId: string;

  @Column()
  uploadedById: string;

  @ManyToOne(() => Task, (task) => task.attachments)
  @JoinColumn({ name: 'taskId' })
  task: Relation<Task>;

  @ManyToOne(() => User, (user) => user.attachments)
  @JoinColumn({ name: 'uploadedById' })
  uploadedBy: Relation<User>;
}
