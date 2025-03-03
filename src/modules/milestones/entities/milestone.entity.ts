import { Project } from 'src/modules/projects/entities/project.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Relation,
} from 'typeorm';

@Entity('milestones')
export class Milestone extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ default: 'NOT_STARTED' })
  status: string;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.milestones)
  @JoinColumn({ name: 'projectId' })
  project: Relation<Project>;

  @OneToMany(() => Task, (task) => task.milestone)
  tasks: Relation<Task[]>;
}
