import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { Task } from './task.entity';

@Entity('milestones')
export class Milestone extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ default: 'NOT_STARTED' })
  status: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.milestones)
  @JoinColumn({ name: 'projectId' })
  project: Relation<Project>;

  @OneToMany(() => Task, (task) => task.milestone)
  tasks: Relation<Task[]>;
}
