import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.create({
    data: { name: 'Cosmatic Cosmetics', slug: 'cosmatic', config: { currency: 'PKR', timezone: 'Asia/Karachi' } },
  });

  const branch = await prisma.branch.create({
    data: { tenantId: tenant.id, name: 'Main Shop', code: 'HQ', city: 'Karachi', province: 'Sindh', isActive: true },
  });

  const role = await prisma.role.create({
    data: { tenantId: tenant.id, name: 'Owner', permissions: JSON.stringify(['*']), isSystem: true },
  });

  const cashierRole = await prisma.role.create({
    data: { tenantId: tenant.id, name: 'Cashier', permissions: JSON.stringify(['pos:*', 'sales:view']), isSystem: true },
  });

  const hash = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.create({
    data: { tenantId: tenant.id, branchId: branch.id, roleId: role.id, name: 'Admin', email: 'admin@cosmatic.com', passwordHash: hash, isActive: true },
  });

  const fiscalYear = await prisma.fiscalYear.create({
    data: { tenantId: tenant.id, name: 'FY2026', startDate: new Date('2026-01-01'), endDate: new Date('2026-12-31'), isActive: true },
  });

  const assets = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, code: '1', name: 'Assets', level: 'CLASS' as any, accountType: 'ASSET' as any, isControl: false },
  });
  const liabilities = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, code: '2', name: 'Liabilities', level: 'CLASS' as any, accountType: 'LIABILITY' as any, isControl: false },
  });
  const equity = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, code: '3', name: 'Equity', level: 'CLASS' as any, accountType: 'EQUITY' as any, isControl: false },
  });
  const revenue = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, code: '4', name: 'Revenue', level: 'CLASS' as any, accountType: 'REVENUE' as any, isControl: false },
  });
  const expense = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, code: '5', name: 'Expenses', level: 'CLASS' as any, accountType: 'EXPENSE' as any, isControl: false },
  });

  const cash = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, parentId: assets.id, code: '101', name: 'Cash in Hand', level: 'LEDGER' as any, accountType: 'ASSET' as any, isCash: true },
  });
  const bank = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, parentId: assets.id, code: '102', name: 'Bank Account', level: 'LEDGER' as any, accountType: 'ASSET' as any, isBank: true },
  });
  const inventory = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, parentId: assets.id, code: '103', name: 'Inventory', level: 'LEDGER' as any, accountType: 'ASSET' as any, isInventory: true },
  });
  const ar = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, parentId: assets.id, code: '104', name: 'Accounts Receivable', level: 'LEDGER' as any, accountType: 'ASSET' as any, isAR: true },
  });
  const ap = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, parentId: liabilities.id, code: '201', name: 'Accounts Payable', level: 'LEDGER' as any, accountType: 'LIABILITY' as any, isAP: true },
  });
  const sales = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, parentId: revenue.id, code: '401', name: 'Sales Revenue', level: 'LEDGER' as any, accountType: 'REVENUE' as any },
  });
  const cogs = await prisma.chartOfAccount.create({
    data: { tenantId: tenant.id, fiscalYearId: fiscalYear.id, parentId: expense.id, code: '501', name: 'Cost of Goods Sold', level: 'LEDGER' as any, accountType: 'EXPENSE' as any },
  });

  const uomPiece = await prisma.unitOfMeasure.create({
    data: { tenantId: tenant.id, code: 'PC', name: 'Piece', isBaseUnit: true },
  });
  const uomDozen = await prisma.unitOfMeasure.create({
    data: { tenantId: tenant.id, code: 'DZ', name: 'Dozen', isBaseUnit: false },
  });

  const item = await prisma.item.create({
    data: {
      tenantId: tenant.id, code: 'LIP-001', name: 'Matte Lipstick', category: 'Lip Care', brand: 'Cosmatic',
      isBatchTracked: true, baseUomId: uomPiece.id, salesUomId: uomPiece.id, purchaseUomId: uomDozen.id,
      isActive: true, reorderLevel: 10, reorderQty: 50,
    },
  });

  await prisma.itemUOMConversion.create({
    data: { itemId: item.id, fromUomId: uomDozen.id, toUomId: uomPiece.id, conversionFactor: 12 },
  });

  const warehouse = await prisma.warehouse.create({
    data: { tenantId: tenant.id, branchId: branch.id, name: 'Main Warehouse', code: 'WH-01', isActive: true },
  });

  const supplier = await prisma.party.create({
    data: { tenantId: tenant.id, name: 'Beauty Distributors Ltd', type: 'SUPPLIER' as any, subType: 'DISTRIBUTOR' as any, code: 'SUP-001', city: 'Karachi', creditLimit: 500000, creditPeriod: 30, creditEnforcement: 'WARN', isActive: true },
  });

  const customer = await prisma.party.create({
    data: { tenantId: tenant.id, name: 'Walk-in Customer', type: 'CUSTOMER' as any, subType: 'RETAILER' as any, code: 'CUS-001', city: 'Karachi', isActive: true },
  });

  console.log('Seed completed:');
  console.log({ tenant: tenant.id, branch: branch.id, user: user.id, fiscalYear: fiscalYear.id });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
