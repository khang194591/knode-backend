import { Organization } from '@/entities';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from '../dto';

export class CreateOrganizationCommand {
  constructor(public readonly dto: CreateOrganizationDto) {}
}

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationCommandHandler
  implements ICommandHandler<CreateOrganizationCommand>
{
  constructor(
    @InjectRepository(Organization)
    private readonly repository: Repository<Organization>,
  ) {}

  async execute(command: CreateOrganizationCommand): Promise<string> {
    const organization = this.repository.create(command.dto);

    await this.repository.save(organization);

    return organization.id;
  }
}
