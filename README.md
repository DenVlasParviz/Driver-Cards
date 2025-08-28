# Driver Cards

Web application for managing driver cards with a dynamic interface (day/night), weather data caching, and hybrid data storage (PostgreSQL + MongoDB).

---

## Contents
- [Overview](#overview)  
- [Requirements](#requirements)  
- [Environment Variables (.env)](#environment-variables-env)  
- [Local Installation and Running](#local-installation-and-running)  
- [Migrations (Sequelize)](#migrations-sequelize)  
- [Docker](#docker)  
- [API: Main Endpoints](#api-main-endpoints)  
- [Screenshots](#screenshots)  

---

## Overview
The project provides a REST API and web interface for creating, viewing, editing, and deleting driver cards. It integrates with an external Weather API; responses are cached in PostgreSQL to reduce requests. UI metadata (e.g., theme: day/night) is stored in MongoDB.

---

## Requirements
- Node.js >= 16  
- npm   
- Docker (optional)  
- PostgreSQL (local or in container)  
- MongoDB (local or in container)  
- Weather API key (for integration)

---

## Environment Variables (.env)
Example `server/.env`:
```
PORT=4000
DATABASE_URL=postgres://postgres:password@localhost:5432/drivers_db
MONGO_URI=mongodb://localhost:27017/drivers_db
JWT_SECRET=your_jwt_secret
WEATHER_API_KEY=your_weather_api_key
```
---

## Local Installation and Running

1. Install dependencies:

- Server:
```bash
cd server
npm install
```
- Client:
```bash
cd ../client
npm install
```

2. Run services:
- Server:
```bash
cd server
npm run dev  
```
- Client:
```bash
cd client
npm run serve 
```

---

## Migrations (Sequelize)
- Apply all existing migrations:
```bash
cd server
npx sequelize db:migrate
```
---

## Docker
Run the full stack:
```bash
docker-compose up --build
```
---

## API: Main Endpoints
Examples below;

### Auth
- `POST /api/auth/register` ‒ registration  
- `POST /api/auth/login` ‒ login  

### Drivers
- `GET /api/info/card` ‒ list of drivers  
- `GET /api/info/card/:id` ‒ driver details  
- `POST /api/info/card` ‒ create driver (Bearer token)  
- `DELETE /api/info/card/:id` ‒ delete driver (Bearer token)
- `GET /api/driver-settings/:driverId` ‒ get settings (returns { "isNight": true|false })
- `POST /api/driver-settings/:driverId`  ‒ save/update settings

### Weather
- `GET /api/weather?lat=<>&lon=<>` ‒ returns weather data; if cached in Postgres, returns cached data.

---

## Screenshots

<img width="1113" height="547" alt="firefox_stbVw5Ojo4" src="https://github.com/user-attachments/assets/3610429e-1fb4-4da1-a1de-7ecff46f6501" />
<img width="1124" height="444" alt="firefox_bq9w4dCb37" src="https://github.com/user-attachments/assets/32b393bd-cfe7-40e7-b9fa-dbb955d30a7e" />
<img width="1894" height="809" alt="460325954-db9c7116-9550-4c3f-bf30-24a7ab210dc2" src="https://github.com/user-attachments/assets/0bfc5643-9176-4f89-b7df-3b8c44b38275" />

---
