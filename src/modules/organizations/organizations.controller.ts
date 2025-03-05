import { Permissions } from '@/shared/decorators';
import { PermissionGuard } from '@/shared/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateOrganizationCommand,
  DeleteOrganizationCommand,
  UpdateOrganizationCommand,
} from './commands';
import {
  CreateOrganizationDto,
  GetListOrganizationDto,
  UpdateOrganizationDto,
} from './dto';
import { GetListOrganizationQuery, GetOrganizationQuery } from './queries';

@Controller('organizations')
@UseGuards(PermissionGuard)
export class OrganizationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions('admin')
  create(@Body() dto: CreateOrganizationDto) {
    return this.commandBus.execute(new CreateOrganizationCommand(dto));
  }

  @Get()
  @Permissions('admin')
  getList(@Query() dto: GetListOrganizationDto) {
    return this.queryBus.execute(new GetListOrganizationQuery(dto));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetOrganizationQuery(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    return this.commandBus.execute(new UpdateOrganizationCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteOrganizationCommand(id));
  }
}
