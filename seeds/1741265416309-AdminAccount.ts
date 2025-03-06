import { Member, Organization, Permission, Role, User } from '@/entities';
import { CommonRole } from '@/modules/roles/enums';
import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminAccount1741265416309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const [user, org] = await Promise.all([
      entityManager.save(User, {
        email: 'admin@knode.com',
        password: await bcrypt.hash('admin@123', 10),
      }),
      entityManager.save(Organization, { name: 'My team' }),
    ]);

    const adminPermission = await entityManager.findOneByOrFail(Permission, {
      name: 'admin',
    });

    const [adminRole, userRole] = await entityManager.save(Role, [
      {
        name: CommonRole.Admin,
        organizationId: org.id,
        permissions: [adminPermission],
      },
      {
        name: CommonRole.User,
        organizationId: org.id,
        permissions: [],
      },
    ]);

    await Promise.all([
      entityManager.update(Organization, org.id, {
        defaultRoleId: userRole.id,
      }),
      entityManager.save(Member, {
        userId: user.id,
        roleId: adminRole.id,
        organizationId: org.id,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, { email: 'admin@knode.com' });
  }
}
