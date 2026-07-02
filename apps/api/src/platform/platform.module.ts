import { Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { BranchController } from './branch.controller';
import { RoleController } from './role.controller';
import { UserController } from './user.controller';
import { AuditController } from './audit.controller';
import { ApprovalController } from './approval.controller';
import { NotificationController } from './notification.controller';
import { TenantService } from './tenant.service';
import { BranchService } from './branch.service';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { AuditService } from './audit.service';
import { ApprovalService } from './approval.service';
import { NotificationService } from './notification.service';

@Module({
  controllers: [TenantController, BranchController, RoleController, UserController, AuditController, ApprovalController, NotificationController],
  providers: [TenantService, BranchService, RoleService, UserService, AuditService, ApprovalService, NotificationService],
  exports: [TenantService, BranchService, RoleService, UserService, AuditService, ApprovalService, NotificationService],
})
export class PlatformModule {}
