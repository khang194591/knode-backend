import { BadRequestException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Permission, Role } from '@/entities';
import { CreateRoleDto } from '../dto';

export class CreateRoleCommand {
  constructor(
    public readonly dto: CreateRoleDto,
    public readonly organizationId: string,
  ) {}
}

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async execute({ dto, organizationId }: CreateRoleCommand): Promise<string> {
    const permissions = await this.permissionRepository.findBy({
      id: In(dto.permissionIds),
    });

    if (permissions.length !== dto.permissionIds.length) {
      throw new BadRequestException('Some permissions were not found');
    }

    const role = this.roleRepository.create({
      ...dto,
      organizationId,
      permissions,
    });

    await this.roleRepository.save(role);

    return role.id;
  }
}
