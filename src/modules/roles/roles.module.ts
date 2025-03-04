import { Permission, Role } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commandHandlers } from './commands';
import { queryHandlers } from './queries';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RolesController],
  providers: [RolesService, ...commandHandlers, ...queryHandlers],
})
export class RolesModule {}
