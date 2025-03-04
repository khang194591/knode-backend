import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
export class OrganizationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateOrganizationDto) {
    return this.commandBus.execute(new CreateOrganizationCommand(dto));
  }

  @Get()
  getList(@Body() dto: GetListOrganizationDto) {
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
