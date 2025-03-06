import {
  BadRequestException,
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

import { GetCurrentUser, RequirePermission } from '@/shared/decorators';
import { PermissionGuard } from '@/shared/guards';
import {
  CreateRoleCommand,
  DeleteRoleCommand,
  UpdateRoleCommand,
} from './commands';
import {
  CreateRoleDto,
  GetListRoleQueryDto,
  GetListRoleResDto,
  UpdateRoleDto,
} from './dto';
import { GetListRoleQuery, GetRoleQuery } from './queries';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('roles')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class RolesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @RequirePermission('role:create')
  create(
    @Body() dto: CreateRoleDto,
    @GetCurrentUser() user: IUserPayload,
  ): Promise<string> {
    return this.commandBus.execute(
      new CreateRoleCommand(dto, user.organizationId),
    );
  }

  @Get()
  @RequirePermission('role:view')
  findAll(
    @Query() query: GetListRoleQueryDto,
    @GetCurrentUser() user: IUserPayload,
  ): Promise<GetListRoleResDto> {
    if (!user.organizationId && !query.organizationId) {
      throw new BadRequestException('Organization ID is required');
    }

    return this.queryBus.execute(
      new GetListRoleQuery(user.organizationId ?? query.organizationId),
    );
  }

  @Get(':id')
  @RequirePermission('role:view')
  findOne(@Param('id') id: string, @GetCurrentUser() user: IUserPayload) {
    return this.queryBus.execute(new GetRoleQuery(id, user.organizationId));
  }

  @Patch(':id')
  @RequirePermission('role:update')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
    @GetCurrentUser() user: IUserPayload,
  ) {
    return this.commandBus.execute(
      new UpdateRoleCommand(id, dto, user.organizationId),
    );
  }

  @Delete(':id')
  @UseGuards(PermissionGuard)
  @RequirePermission('role:delete')
  remove(@Param('id') id: string, @GetCurrentUser() user: IUserPayload) {
    return this.commandBus.execute(
      new DeleteRoleCommand(id, user.organizationId),
    );
  }
}
