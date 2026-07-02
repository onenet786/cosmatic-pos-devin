import { Prisma } from '@prisma/client';

export const publicUserSelect = {
  id: true,
  tenantId: true,
  branchId: true,
  roleId: true,
  name: true,
  email: true,
  phone: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;
