# Driver Cards

Веб-додаток для керування картками водіїв з динамічним інтерфейсом (день/ніч), кешуванням погодних даних та гібридним зберіганням інформації (PostgreSQL + MongoDB).

---

## Зміст
- [Огляд](#огляд)  
- [Вимоги](#вимоги)  
- [Змінні оточення (.env)](#змінні-оточення-env)  
- [Локальна інсталяція та запуск](#локальна-інсталяція-та-запуск)  
- [Міграції (Sequelize)](#міграції-sequelize)  
- [Docker](#docker)  
- [API: основні ендпойнти](#api-основні-ендпойнти)  
- [База даних та примітки](#база-даних-та-примітки)  
- [Скріншоти](#скріншоти)  


---

## Огляд
Проєкт надає REST API і веб-інтерфейс для створення, перегляду, редагування та видалення карток водіїв. Інтегрується з зовнішнім Weather API; відповідь кешується в PostgreSQL для зменшення кількості запитів. UI-метадані (наприклад, тема: день/ніч) зберігаються в MongoDB.



---

## Вимоги
- Node.js >= 16  
- npm   
- Docker (опціонально)  
- PostgreSQL (локально або в контейнері)  
- MongoDB (локально або в контейнері)  
- Weather API key (для інтеграції)

---

## Змінні оточення (.env)
Приклад `server/.env`:
```
PORT=4000
DATABASE_URL=postgres://postgres:password@localhost:5432/drivers_db
MONGO_URI=mongodb://localhost:27017/drivers_db
JWT_SECRET=your_jwt_secret
WEATHER_API_KEY=your_weather_api_key
```
---

## Локальна інсталяція та запуск

1. Встановити залежності:
```bash
# сервер
cd server
npm install

# клієнт
cd ../client
npm install
```

3. Налаштувати `.env` у папці `server/`.

4. Застосувати міграції 

5. Запустити сервіси:
- Сервер:
```bash
cd server
npm run dev  
```
- Клієнт:
```bash
cd client
npm run serve 
```

---

## Міграції (Sequelize)
- Застосувати всі наявні міграції:
```bash
cd server
npx sequelize db:migrate
```
---

## Docker
Підняття всього стеку:
```bash
docker-compose up --build
```
---

## API: основні ендпойнти
Нижче наведені приклади;

### Auth
- `POST /api/auth/register` — реєстрація  
  Body: `{ "email", "password"}`  
- `POST /api/auth/login` — логін  
  Body: `{ "email", "password" }`  
  Response: `{ "token": "<JWT>" }`

### Drivers
- `GET /api/info/card` — список водіїв  
- `GET /api/info/card/:id` — деталі водія  
- `POST /api/info/card` — створити водія (Bearer token)  
- `DELETE /api/info/card/:id` ‒ видалити (Bearer token)
- `GET /api/driver-settings/:driverId` ‒ отримати налаштування (повертає { "isNight": true|false })
- `POST /api/driver-settings/:driverId`  ‒ зберегти/оновити налаштування:

### Weather
- `GET /api/weather?lat=<>&lon=<>` — повертає дані про погоду; якщо є кеш у Postgres і він не протермінований — повертає кеш.

---

## База даних та примітки
- **Drivers**: модель має міграції — після застосування міграцій таблиця створюється.  
- **Users**: може бути відсутня міграція в репозиторії; перевірте `migrations/` і за потреби створіть міграцію `create-users`.  
- Якщо ви додаєте або змінюєте структуру таблиць — генеруйте міграції, не міняйте існуючі вручну.

---

## Скріншоти

<img width="1113" height="547" alt="firefox_stbVw5Ojo4" src="https://github.com/user-attachments/assets/3610429e-1fb4-4da1-a1de-7ecff46f6501" />
<img width="1124" height="444" alt="firefox_bq9w4dCb37" src="https://github.com/user-attachments/assets/32b393bd-cfe7-40e7-b9fa-dbb955d30a7e" />
<img width="1894" height="809" alt="460325954-db9c7116-9550-4c3f-bf30-24a7ab210dc2" src="https://github.com/user-attachments/assets/0bfc5643-9176-4f89-b7df-3b8c44b38275" />



---

