import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '@/entities';
import { BadRequestException } from '@nestjs/common';

export class DeleteRoleCommand {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
  ) {}
}

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async execute({ id, organizationId }: DeleteRoleCommand): Promise<void> {
    const role = await this.roleRepository.findOne({
      where: { id, organizationId },
    });

    if (!role) {
      throw new BadRequestException(
        `Role with ID ${id} not found in organization ${organizationId}`,
      );
    }

    await this.roleRepository.softDelete({ id, organizationId });
  }
}
