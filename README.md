
# 🎯 My Portion App

**My Portion App** is a full-stack web application managed in a monorepo using [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces). It provides a seamless frontend and backend integration for a modern web experience.

- 🖥 **Frontend**: Next.js 15, TailwindCSS 4, Radix UI  
- 🔧 **Backend**: Express.js, Sequelize ORM, PostgreSQL, TypeScript  
- 🧩 **Monorepo**: Managed with `npm workspaces` and `concurrently` for easy multi-service development

---

## 📁 Folder Structure

```
my-portion-app/
├── backend/             # Express API (TypeScript, Sequelize)
│   └── build/           # Compiled JavaScript
│   ├── config/          #
│   ├── controller/      #
│   ├── database/        #
│   ├── events/          #
│   ├── helpers/         #
│   ├── mailer/          #
│   ├── middleware/      #
│   ├── routes/          #
│   ├── types/           #
│   ├── uploads/         #          
├── package.json         # Root monorepo config
├── tsconfig.json        # Optional shared TS config
├── frontend/            # Next.js 15 frontend (TailwindCSS, Radix UI)
│   ├── app/             # 
│   ├── components/      # 
│   ├── lib/             # 
│   ├── public/          # 
├── package.json         # Root monorepo config
├── tsconfig.json        # Optional shared TS config
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js **v18+**
- npm **v7+**
- PostgreSQL **installed and running**

---

### 📦 Install Dependencies

Clone the repo and install all packages:

```bash
git clone https://github.com/PortionTechOrg/my-portion-app.git
cd my-portion-app
npm install
```

This installs dependencies for both `frontend/` and `backend/` using npm workspaces.

---

### ⚙️ Environment Setup

Create a `.env` file in **both** `backend/` and `frontend/`.

#### ➤ Backend (`backend/.env`)

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=myportiondb
DB_PORT=5432
```

#### ➤ Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🧪 Root Scripts (`package.json`)

| Command                | Description                                    |
|------------------------|------------------------------------------------|
| `npm run dev`          | Run both frontend and backend concurrently     |
| `npm run dev:frontend` | Run frontend in development mode               |
| `npm run dev:backend`  | Run backend in development mode                |
| `npm run build`        | Build both frontend and backend                |
| `npm run build:frontend` | Build only frontend                          |
| `npm run build:backend`  | Build only backend                           |
| `npm run migrate`         | Run DB migrations (backend)                 |
| `npm run migrate:undo`    | Undo last DB migration                      |

---

## 🖼 Frontend: Next.js 15 + TailwindCSS

### 🧪 Frontend Scripts

Run from root or within `frontend/`:

```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

### 🛠 Frontend Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

---

## 🔧 Backend: Express + Sequelize + PostgreSQL

### 🧪 Backend Scripts

Run from root or within `backend/`:

```bash
npm run dev:backend
# or
cd backend && npm run dev
```

### 🛠 Backend Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **ORM**: [Sequelize](https://sequelize.org/) with `sequelize-typescript`
- **Database**: PostgreSQL
- **Auth**: JWT via `jsonwebtoken`
- **Env Management**: `dotenv` & `dotenv-cli`
- **Types**: TypeScript
- **Live Reload**: `nodemon`

### 🗃 Migrations

```bash
# Run all migrations
npm run migrate

# Undo last migration
npm run migrate:undo
```

> Uses `sequelize-cli` and `.env` with `dotenv-cli`.

---

## 🧰 Sequelize Project Structure

Make sure `backend/.sequelizerc` is configured like this:

```js
const path = require('path');

module.exports = {
  config: path.resolve('src/config/config.js'),
  modelsPath: path.resolve('src/models'),
  migrationsPath: path.resolve('src/migrations'),
  seedersPath: path.resolve('src/seeders'),
};
```

---

## 🧠 Dev Tips

- Use `npm run dev` from root to boot everything at once.
- Use `npm install <pkg> --workspace backend` or `--workspace frontend` to scope packages.
- Use `.env` and `.env.local` for secure config separation.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

## 🙋‍♂️ Feedback & Contributions

We welcome issues, PRs, and suggestions!  
🔗 [GitHub Issues](https://github.com/PortionTechOrg/my-portion-app/issues)
