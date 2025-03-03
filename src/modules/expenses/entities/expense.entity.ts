import { Project } from 'src/modules/projects/entities/project.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';

@Entity('expenses')
export class Expense extends BaseEntity {
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.expenses)
  @JoinColumn({ name: 'projectId' })
  project: Relation<Project>;
}
