import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { MilestonesModule } from './modules/milestones/milestones.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { RolesModule } from './modules/roles/roles.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { I18nMiddleware } from 'nestjs-i18n';
import { JobQueueModule } from './modules/queues/queue.module';

@Module({
  imports: [
    CoreModule,
    JobQueueModule,
    AuthModule,
    AttachmentsModule,
    CommentsModule,
    ExpensesModule,
    MilestonesModule,
    OrganizationsModule,
    ProjectsModule,
    TasksModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(I18nMiddleware).forRoutes('*');
  }
}
