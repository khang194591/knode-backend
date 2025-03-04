import { Organization } from '@/entities';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class DeleteOrganizationCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteOrganizationCommand)
export class DeleteOrganizationCommandHandler
  implements ICommandHandler<DeleteOrganizationCommand>
{
  constructor(
    @InjectRepository(Organization)
    private readonly repository: Repository<Organization>,
  ) {}

  async execute(command: DeleteOrganizationCommand): Promise<void> {
    await this.repository.softDelete(command.id);
  }
}
