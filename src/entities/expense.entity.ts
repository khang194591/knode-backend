import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Project } from './project.entity';

@Entity('expenses')
export class Expense extends BaseEntity {
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.expenses)
  @JoinColumn({ name: 'projectId' })
  project: Relation<Project>;
}
