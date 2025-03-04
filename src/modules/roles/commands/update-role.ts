import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Permission, Role } from '@/entities';
import { BadRequestException } from '@nestjs/common';
import { UpdateRoleDto } from '../dto';

export class UpdateRoleCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateRoleDto,
    public readonly organizationId: string,
  ) {}
}

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async execute({ id, dto, organizationId }: UpdateRoleCommand): Promise<void> {
    const role = await this.roleRepository.findOne({
      where: { id, organizationId },
    });

    if (!role) {
      throw new Error(
        `Role with ID ${id} not found in organization ${organizationId}`,
      );
    }

    if (dto.permissionIds) {
      const permissions = await this.permissionRepository.findBy({
        id: In(dto.permissionIds),
      });

      if (permissions.length !== dto.permissionIds.length) {
        throw new BadRequestException('Some permissions were not found');
      }

      role.permissions = permissions;
    }

    await this.roleRepository.save(role);
  }
}
