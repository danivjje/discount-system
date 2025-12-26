# Discount System

A simple discount (bonus) management system. 📕  
Built with **Express.js + Vue.js**,

## 💽 Technical Stack

- **Backend:** Express.js, MySQL, Drizzle ORM.
- **Frontend:** Vue.js, PrimeVue, Pinia, Vue Router, ky.
- **Common:** TypeScript, Zod

## 🪶 Features

- 🔐 JWT-based authentication
- 👥 Manage and view your customers
- 💰 Add (enroll) bonuses to customers
- 📱 Reset customer bonuses with SMS code verification _(coming soon)_
- ⚙️ Change system settings

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/danivjje/discount-system.git
cd discount-system
pnpm install
```

Fill in the environment files:
(You can use the provided .env.example files in those directories as templates.)

- apps/server/.env
- .env

Database Setup:

```bash
pnpm db:migrate
pnpm db:seed:base
```

Also you can create 500 test customers with random values:

```bash
pnpm db:seed:dev
```

Run the project:

```bash
pnpm dev
```

For build:

```bash
pnpm build
```
