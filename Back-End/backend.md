# Docker Setup & Manual Database Verification Guide

## 1. Prerequisites

Make sure Docker is installed:
```bash
docker --version
docker compose version
```

If Docker is not running:
```bash
sudo systemctl start docker
```

Enable auto-start on boot:
```bash
sudo systemctl enable docker
```

## 2. Start PostgreSQL Container

From the project root (where docker-compose.yml is located):
```bash
docker-compose up -d
```

Check if the container is running:
```bash
docker ps
```

You should see
```bash
foodapp-postgres
```

## 3. Run Migrations

After the database container is running:
```bash
go run migrate.go up
```

To rollback:
```bash
go run migrate.go down
```

To seed data:
```bash
go run migrate.go seed
```

## 4. Access PostgreSQL Manually (Inside Container)

To access PostgreSQL:
```bash
sudo docker exec -it payment_postgres psql -U postgres -d payment_db
```

You are now inside the PostgreSQL CLI.

### Useful PostgreSQL Commands

List tables:
```bash
\dt
```

Describe the table"
```bash
\d table_name
```

Query data:
```bash
SELECT * FROM table_name;
```

Exit PostgreSQL:
```bash
\q
```

## 5. Reset Database (Optional)

To completely reset the database:
```bash
docker-compose down -v
docker-compose up -d
```

## 6. Quick Workflow for Setup 

```bash
cd Back-End
sudo docker-compose up -d
go run migrate.go up
go run migrate.go down
go run migrate.go seed
```