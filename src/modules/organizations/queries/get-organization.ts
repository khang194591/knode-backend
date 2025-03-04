import { Organization } from '@/entities';
import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class GetOrganizationQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetOrganizationQuery)
export class GetOrganizationQueryHandler
  implements IQueryHandler<GetOrganizationQuery>
{
  constructor(
    @InjectRepository(Organization)
    private readonly repository: Repository<Organization>,
  ) {}

  async execute(query: GetOrganizationQuery): Promise<Organization> {
    const organization = await this.repository.findOne({
      where: { id: query.id },
      relations: [],
    });

    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    return organization;
  }
}
