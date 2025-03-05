import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInResDto, SwitchOrganizationDto } from '../dto';
import { JwtService } from '@nestjs/jwt';

export class SwitchOrganizationCommand {
  constructor(
    public readonly token: string,
    public readonly dto: SwitchOrganizationDto,
  ) {}
}

@CommandHandler(SwitchOrganizationCommand)
export class SwitchOrganizationHandler
  implements ICommandHandler<SwitchOrganizationCommand>
{
  constructor(private readonly jwtService: JwtService) {}

  async execute({
    token,
    dto,
  }: SwitchOrganizationCommand): Promise<SignInResDto> {
    const payload: IUserPayload = await this.jwtService.decode(token);

    payload.organizationId = dto.organizationId;

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
