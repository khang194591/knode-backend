import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Role } from '@/entities';
import { GetRoleResDto } from '../dto';

export class GetRoleQuery {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
  ) {}
}

@QueryHandler(GetRoleQuery)
export class GetRoleHandler implements IQueryHandler<GetRoleQuery> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async execute({ id, organizationId }: GetRoleQuery): Promise<GetRoleResDto> {
    const role = await this.roleRepository.findOne({
      where: { id, organizationId },
      relations: ['permissions'],
    });

    if (!role) {
      throw new BadRequestException(
        `Role with ID ${id} not found in organization ${organizationId}`,
      );
    }

    return plainToInstance(GetRoleResDto, {
      ...role,
      permissions: (role.permissions || []).map(({ name }) => name),
    });
  }
}
