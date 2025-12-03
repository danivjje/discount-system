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
- packages/.env

Database Setup:

```bash
cd packages
pnpm drizzle-kit migrate
```

Run the project:

```bash
pnpm server:dev
pnpm client:dev
```
