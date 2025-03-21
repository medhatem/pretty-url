# Pretty URL

[![Node.js][node-badge]][node-url]
[![NestJS][nestjs-badge]][nestjs-url]
[![TypeScript][typescript-badge]][typescript-url]
[![Docker][docker-badge]][docker-url]
[![License: MIT][license-badge]][license-url]

A simple URL shortener built with **NestJS** (TypeScript) for the backend and **React** (TypeScript) for the frontend.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running with Docker Compose](#running-with-docker-compose)
   - [Running Locally (Without Docker)](#running-locally-without-docker)
5. [Swagger Documentation](#swagger-documentation)
6. [License](#license)

## Tech Stack

- **NestJS** (TypeScript) – Backend REST API
- **React** (TypeScript) – Frontend web application
- **Docker** & **Docker Compose** – Containerization
- **PostgreSQL** – Database
- **TypeORM** – ORM for database interactions
- **Swagger** – API Documentation

## Features

- Shortens any valid URL into a shorter, unique slug
- Stores short URLs in a database
- Redirects visitors to original links
- Swagger-powered API documentation
- Written entirely in TypeScript

## Project Structure

```
.
├── docker-compose.yml
├── pretty-url-api # NestJS backend
│ ├── src
│ ├── package.json
│ ├── tsconfig.json
│ └── ...
├── pretty-url-react # React frontend
│ ├── src
│ ├── package.json
│ ├── tsconfig.json
│ └── ...
└── README.md

```

## Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (version 18.x or later)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (if you plan to run via Docker)
- [PostgreSQL](https://www.postgresql.org/) (if you plan to run locally without Docker)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/medhatem/pretty-url.git
   cd pretty-url
   ```

2. **Install dependencies** for both backend and frontend using npm:

   ```bash
   # In the backend (NestJS)
   cd pretty-url-api
   npm install
   cd ..

   # In the frontend (React)
   cd pretty-url-react
   npm install
   cd ..
   ```

### Running with Docker Compose

1. **Configure environment** variables (if needed) in an `.env` file or via your Docker Compose configuration.
2. In the **root** directory (where `docker-compose.yml` is), run:
   ```bash
   docker-compose build
   docker-compose up
   ```
3. The **NestJS** server (API) will run at [http://localhost:3000](http://localhost:3000)
   The **React** frontend will run at [http://localhost:3001](http://localhost:3001)

### Running Locally (Without Docker)

If you prefer running everything directly on your machine:

#### 1. Spin Up a PostgreSQL Database

- You can install Postgres locally or run just the database via Docker:
  ```bash
  docker run --name pretty-url-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=prettyurl -p 5432:5432 -d postgres
  ```

#### 2. Start the Backend (NestJS)

1. Make sure your environment variables (DB host, username, password) are set in `pretty-url-api/.env` or in `app.module.ts`.
2. From the **pretty-url-api** folder:
   ```bash
   npm run start:dev
   ```
   - This starts NestJS in watch mode at [http://localhost:3000](http://localhost:3000).

#### 3. Start the Frontend (React)

1. From the **pretty-url-react** folder:
   ```bash
   npm run dev
   ```
2. The React app will run at [http://localhost:3001](http://localhost:3001).

## Swagger Documentation

Once the **NestJS** server is running, you can access the Swagger UI here:

```
http://localhost:3000/api
```

Explore and test the available endpoints interactively.

## License

This project is licensed under the terms of the **MIT License**. See the [LICENSE][https://github.com/medhatem/LICENCE] file for details.
