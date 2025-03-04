import { Organization } from '@/entities';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrganizationDto } from '../dto';

export class UpdateOrganizationCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateOrganizationDto,
  ) {}
}

@CommandHandler(UpdateOrganizationCommand)
export class UpdateOrganizationCommandHandler
  implements ICommandHandler<UpdateOrganizationCommand>
{
  constructor(
    @InjectRepository(Organization)
    private readonly repository: Repository<Organization>,
  ) {}

  async execute({ id, dto }: UpdateOrganizationCommand): Promise<void> {
    const organization = await this.repository.findOneBy({ id });

    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    await this.repository.update(id, dto);
  }
}
