# Sales Admin Panel

## 📌 Project Overview

The Sales Admin Panel is a **Node.js** backend API system for managing wholesalers and retailers. The project follows the **MVC architecture** and uses **Sequelize ORM** with **PostgreSQL/MySQL** as the database.

## 🛠️ Tech Stack

- **Node.js** - Backend runtime
- **Nest.js** - Web framework
- **Sequelize ORM** - Database ORM
- **PostgreSQL** - Relational database

### 📥 Download Links

- 🔗 [Download Node.js](https://nodejs.org/en/download/)
- 🔗 [Read NestJS (Docs)](https://nestjs.com/)
- 🔗 [Read Sequelize (Docs)](https://sequelize.org/)
- 🔗 [Download PostgreSQL](https://www.postgresql.org/download/)

## 🏗️ Database Schema

### **Database Name:** `wholesaler`

#### **Tables:**

1. **Wholesalers**

   - `id` (UUID, Primary Key)
   - `name` (STRING)
   - `mobile_number` (STRING)
   - `createdAt` (TIMESTAMP)
   - `updatedAt` (TIMESTAMP)

2. **Retailers**

   - `id` (UUID, Primary Key)
   - `name` (STRING)
   - `mobile_number` (STRING)
   - `createdAt` (TIMESTAMP)
   - `updatedAt` (TIMESTAMP)

3. **WholesalerRetailers** (Pivot Table for Many-to-Many Relationship)

   - `wholesaler_id` (UUID, Foreign Key -> Wholesalers.id)
   - `retailer_id` (UUID, Foreign Key -> Retailers.id)
   - `createdAt` (TIMESTAMP)
   - `updatedAt` (TIMESTAMP)

4. **Stock**
   - `id` (UUID, Primary Key)
   - `wholesaler_id` (UUID, Foreign Key -> Wholesalers.id)
   - `retailer_id` (UUID, Foreign Key -> Retailers.id)
   - `stock_amount` (INTEGER)
   - `createdAt` (TIMESTAMP)
   - `updatedAt` (TIMESTAMP)

## 🚀 API Endpoints

### 1️⃣ **Get Wholesaler with Retailers**

```http
GET sales/wholesaler/:wholesaler_id
```

- **Input:** `wholesaler_id`
- **Output:** Wholesaler details with associated retailers

### 2️⃣ **Get Retailers with a Single Wholesaler**

```http
GET sales/retailer/single-wholesaler
```

- **Output:** List of retailers associated with only one wholesaler

### 3️⃣ **Get Total Monthly Turnover of Each Wholesaler**

```http
GET sales/turnover
```

- **Output:** Monthly turnover of each wholesaler for the year 2021

### 4️⃣ **Get Max Turnover of Each Wholesaler from a Single Retailer**

```http
GET sales/max-turnover
```

- **Output:** Maximum turnover from a single retailer for each wholesaler

## 📦 Installation & Setup

### **Step 1: Clone the repository**

```bash
$ git clone <repo-url>
$ cd SalesAdminPanel
```

### **Step 2: Install Dependencies**

```bash
$ npm install
```

### **Step 3: Setup Environment Variables**

Create a `.env` file and add the following details:

```env
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=password
PG_DATABASE=wholesaler
```

### **Step 4: Run Migrations**

```bash
$ npx sequelize db:migrate
```

### **Step 5: Seed the Database**

```bash
$ npm run seed
```

### **Step 6: Start the Server**

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:local

# Production mode
$ npm run start:prod
```

## 🔥 Run API Tests

Use **Swagger UI** to test the API endpoints.
open Web Browser and visit the following url.

```bash
http://localhost:3000/api-docs
```

## 👨‍💻 Author

Developed by ` Sathya Swaroop Vandavasi`
