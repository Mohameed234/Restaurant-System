# Restaurant Management System

A full-stack restaurant management system built with **Laravel** (backend) and **React** (frontend). It includes a user panel for placing orders and an admin panel for managing orders, menu items, and reservations.


## For Back-End


1. Install dependencies for Back-End : 
```bash
composer install
```

2. Copy .env and set up your database:
```bash
cp .env.example .env
```

3. Edit .env and configure your DB:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_db
DB_USERNAME=root
DB_PASSWORD=
```

4. Generate app key
```bash
php artisan key:generate
```

5. Run migrations and seeders:
```bash
php artisan migrate --seed
```

6. Start backend server:
```bash
php artisan serve
```

-------------------------------------------------

## For Front-End

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

--------------------------------------------------

## For Admin-Panel

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

--------------------------------------------------

## Test Data

- Admin: admin@example.com
- Password: password


- User: jerde.pietro@example.com
- Password: password
