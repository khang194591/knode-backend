import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('members')
export class Member extends BaseEntity {
  @Column()
  roleId: string;

  @Column()
  userId: string;

  @Column()
  organizationId: string;

  @ManyToOne(() => Role, (user) => user.members)
  role: Relation<Role>;

  @ManyToOne(() => User, (user) => user.profiles)
  user: Relation<User>;

  @ManyToOne(() => Organization, (user) => user.members)
  organization: Relation<Organization>;
}
