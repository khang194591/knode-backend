import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Role } from '@/entities';
import { GetListRoleResDto } from '../dto';

export class GetListRoleQuery {
  constructor(public readonly organizationId: string) {}
}

@QueryHandler(GetListRoleQuery)
export class GetListRoleHandler implements IQueryHandler<GetListRoleQuery> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async execute({
    organizationId,
  }: GetListRoleQuery): Promise<GetListRoleResDto> {
    const roles = await this.roleRepository.find({
      where: { organizationId },
      relations: ['permissions'],
    });

    return plainToInstance(GetListRoleResDto, {
      items: roles.map((role) => ({
        ...role,
        permissions: (role.permissions || []).map(({ name }) => name),
      })),
    });
  }
}
