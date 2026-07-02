# Deploy Cosmatic POS on aaPanel

This setup runs the API and web app on private, unique ports so it does not disturb Node projects already hosted by aaPanel. The public web process uses port `3017` and the private API uses port `3018`; confirm both are free before starting.

## 1. Requirements

- Node.js 20 LTS and npm
- PostgreSQL 16 (local or managed)
- aaPanel **Node Project Manager** and Nginx
- A domain such as `pos.example.com` with DNS pointed to the server

Do not expose ports 3017, 3018, PostgreSQL, or Redis publicly. Only Nginx should accept public HTTP/HTTPS traffic.

## 2. Upload and install

Upload the repository to a dedicated path, for example:

```bash
cd /www/wwwroot/cosmatic-pos
npm ci
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.production
```

Edit both environment files. Use a new database user/password and generate the JWT secret with:

```bash
openssl rand -base64 48
```

Check that the selected ports are unused:

```bash
ss -ltnp | grep -E ':3017|:3018' || true
```

If either port is occupied, choose another pair and update the aaPanel project ports, `apps/api/.env`, `apps/web/.env.production`, and the Nginx upstream below.

## 3. Database and build

Create the PostgreSQL database and user through aaPanel or PostgreSQL, then run:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
npm run build
```

This repository does not yet contain a Prisma migration history, so `db:migrate` applies the checked-in schema with `prisma db push`. Take a database backup first and review schema changes carefully on future updates. Only run the seed command for a new installation. Change the seeded admin password immediately.

## 4. Add two aaPanel Node projects

In **Website > Node Project**, create these independent projects:

| Setting | API | Web |
|---|---|---|
| Project name | `cosmatic-api` | `cosmatic-web` |
| Project directory | `/www/wwwroot/cosmatic-pos` | `/www/wwwroot/cosmatic-pos` |
| Run command | `npm run start:api` | `npm run start:web -- --port 3017 --hostname 127.0.0.1` |
| Node version | 20 LTS | 20 LTS |
| Port | 3018 | 3017 |

Set each project to start automatically and keep its own process name. Do not reuse an existing project's port or process entry. The API reads its port from `apps/api/.env`; the web command sets its port explicitly.

Start the API first, then the web project. Test privately on the server:

```bash
curl -I http://127.0.0.1:3018/api/docs
curl -I http://127.0.0.1:3017
```

## 5. Nginx reverse proxy

Create the `pos.example.com` website in aaPanel, enable SSL, then add this inside its `server` block (aaPanel's reverse-proxy UI can create the `/` proxy; add the headers if missing):

```nginx
location / {
    proxy_pass http://127.0.0.1:3017;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 120s;
}
```

The browser calls `/api/...` on the web domain. Next.js forwards those requests internally to `API_INTERNAL_URL`, so no separate public API domain or CORS exception is required.

## 6. Updates and rollback

Back up the database before every update. Then, from the project directory:

```bash
npm ci
npm run db:generate
npm run db:migrate
npm run build
```

Restart only `cosmatic-api` and `cosmatic-web` in aaPanel. Other Node projects remain untouched because their processes, ports, directories, and Nginx virtual hosts are separate.

For rollback, restore the previous application directory/release and the matching database backup. Prisma migrations should be treated as forward-only; do not delete applied migration rows manually.

## 7. Production checks

```bash
curl -fsS https://pos.example.com/ >/dev/null
curl -fsS https://pos.example.com/api/docs >/dev/null
```

Also verify login, dashboard loading, database backups, aaPanel process auto-start after reboot, SSL renewal, and that ports 3017/3018 are blocked by the external firewall.
