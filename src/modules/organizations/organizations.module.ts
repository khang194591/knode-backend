import { Organization } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commandHandlers } from './commands';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { queryHandlers } from './queries';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, ...commandHandlers, ...queryHandlers],
})
export class OrganizationsModule {}
