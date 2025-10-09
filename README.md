# Restaurant Menu App

Monorepo with backend (Express + MySQL) and frontend (Vue 3 + Vite + Pinia).

## Prerequisites

- Node 18+
- Docker (optional, for MySQL + Redis)

## Quick Start (Local + Docker DB)

1. Start databases:

```
docker compose up -d db redis
```

2. Backend env (create `app/backend/.env`):

```
PORT=5000
JWT_SECRET=dev_secret
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=user
DB_PASSWORD=pass
DB_NAME=restaurant
```

3. Backend:

```
cd app/backend
npm i
npm run dev
```

4. Frontend:

```
cd app/frontend
npm i
npm run dev
```

5. Open `http://localhost:5173`.

## Notable Routes

- API base: `http://localhost:5000/api`
- Auth: `/auth/login`, `/auth/sign`, `/auth/refresh`, `/auth/verify-user`, `/auth/logout`
- Restaurants: `/restaurants`, `/restaurants/mine` (owner)
- Categories: `/categories/:restaurantId`, POST `/categories/create` (owner)
- Items: `/items`, POST `/items/create` (owner), `/items/add-to-category`, `/items/add-to-restaurant`

## Frontend Pages

- Dashboards: `/dashboard/owner`, `/dashboard/manager`, `/dashboard/staff`
- Admin: `/admin/restaurants`, `/admin/categories`, `/admin/items`

# Restaurant Menu Project
