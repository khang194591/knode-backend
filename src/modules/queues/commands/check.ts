import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class CheckCommand {}

@CommandHandler(CheckCommand)
export class CheckHandler implements ICommandHandler<CheckCommand> {
  async execute() {
    await Promise.all([]);
    console.log('Checked\n');
  }
}
