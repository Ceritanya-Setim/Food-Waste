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
docker-compose up -d --build
```

Check if the container is running:
```bash
docker ps
```

You should see
```bash
foodapp-postgres and foodapp-api 
```

## 3. Access PostgreSQL Manually (Inside Container)

To access PostgreSQL:
```bash
sudo docker exec -it foodapp-postgres psql -U cihuy -d foodapp
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

## 4. Reset Database (Optional)

To completely reset the database:
```bash
docker-compose down -v
docker-compose up -d
```

## 5. Quick Workflow for Setup 

```bash
cd Back-End
sudo docker-compose up -d --build
```

## 6. Another Useful Documentation
- [DB](./database/DB.sql)
- [API](./routes/routes.go)