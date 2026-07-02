# Cosmatic POS ERP

Cosmetics Trading ERP & POS Platform — a SaaS-native, multi-branch ERP for cosmetics distributors and retailers.

## Architecture

- **Backend**: NestJS + Prisma + PostgreSQL (multi-tenant)
- **Web Admin**: Next.js + Tailwind CSS
- **Owner Mobile App**: React Native (Expo)
- **DevOps**: Docker Compose, Turborepo, pnpm

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+
- Docker & Docker Compose

### 1. Start Infrastructure
```bash
docker-compose up -d
```
This starts PostgreSQL, Redis, and MinIO.

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Setup Database
```bash
cd apps/api
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run Backend
```bash
cd apps/api
pnpm dev
```
API runs at http://localhost:3018 with Swagger docs at `/api/docs`.

### 5. Run Web Frontend
```bash
cd apps/web
pnpm dev
```
Web runs at http://localhost:3017.

### 6. Run Mobile App
```bash
cd apps/mobile
pnpm start
```
Scan QR with Expo Go or press `a` / `i` for emulator.

## Default Login
- **Email**: `admin@cosmatic.com`
- **Password**: `admin123`

## Modules

| Module | Features |
|--------|----------|
| **Auth** | JWT login/register, RBAC guards |
| **Platform** | Tenants, branches, users, roles, audit logs, approvals, notifications |
| **Financial** | Chart of Accounts, vouchers (double-entry), fiscal years, reversals |
| **Inventory** | Items (multi-UOM, batch/expiry), warehouses, stock transfers, adjustments |
| **Purchase** | Purchase orders, GRN, purchase invoices |
| **Sales** | Quotations, sales orders, sales invoices, sales returns |
| **AR/AP** | Receipts, payments, PDC cheques, aging |
| **POS** | Offline-first sessions, transactions, barcode support, return requests |
| **Reports** | Dashboard, trial balance, AR aging |

## Project Structure

```
cosmatic-pos-devin/
├── apps/
│   ├── api/          # NestJS backend
│   │   ├── prisma/schema.prisma
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   ├── platform/
│   │   │   ├── financial/
│   │   │   ├── inventory/
│   │   │   ├── purchase/
│   │   │   ├── sales/
│   │   │   ├── ar-ap/
│   │   │   ├── pos/
│   │   │   └── reports/
│   ├── web/          # Next.js admin frontend
│   └── mobile/       # React Native owner app
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Environment Variables

Copy `apps/api/.env.example` to `apps/api/.env` and update:
- `DATABASE_URL`
- `JWT_SECRET`
- `REDIS_URL`

## License

Proprietary — Cosmatic Cosmetics Trading.
