import { Organization } from '@/entities';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetListOrganizationDto, GetListOrganizationResDto } from '../dto';

export class GetListOrganizationQuery {
  constructor(public readonly dto: GetListOrganizationDto) {}
}

@QueryHandler(GetListOrganizationQuery)
export class GetListOrganizationQueryHandler
  implements IQueryHandler<GetListOrganizationQuery>
{
  constructor(
    @InjectRepository(Organization)
    private readonly repository: Repository<Organization>,
  ) {}

  async execute(
    query: GetListOrganizationQuery,
  ): Promise<GetListOrganizationResDto> {
    const { page, limit, search } = query.dto;
    const queryBuilder = this.repository.createQueryBuilder('organization');

    if (search) {
      queryBuilder.where('organization.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [organizations, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: organizations,
      meta: {
        total,
        page,
        limit,
      },
    };
  }
}
