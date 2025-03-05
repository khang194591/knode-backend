import { Permission } from '@/entities';
import { permissionList } from '@/modules/permissions/enums';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Permissions1741173106274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const permissionRepository = queryRunner.manager.getRepository(Permission);

    await permissionRepository.insert(
      permissionList.map((permission) => ({ name: permission })),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const permissionRepository = queryRunner.manager.getRepository(Permission);

    await permissionRepository.delete({});
  }
}
