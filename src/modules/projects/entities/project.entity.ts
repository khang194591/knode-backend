import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { Milestone } from 'src/modules/milestones/entities/milestone.entity';
import { Organization } from 'src/modules/organizations/entities/organization.entity';
import { BaseEntity } from 'src/core/database/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  budget: number;

  @Column({ default: 'PLANNING' })
  status: string;

  @Column()
  organizationId: number;

  @ManyToOne(() => Organization, (organization) => organization.projects)
  @JoinColumn({ name: 'organizationId' })
  organization: Relation<Organization>;

  @OneToMany(() => Milestone, (milestone) => milestone.project)
  milestones: Relation<Milestone[]>;

  @OneToMany(() => Expense, (expense) => expense.project)
  expenses: Relation<Expense[]>;
}
