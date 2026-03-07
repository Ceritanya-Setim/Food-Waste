# Build stage
FROM golang:1.25-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Build binary dengan nama 'main'
RUN go build -o main .

# Run stage
FROM alpine:latest
WORKDIR /root/
# Ambil binary dari builder stage
COPY --from=builder /app/main .
# Ambil .env kalau aplikasi lo baca file .env manual saat runtime
COPY .env . 

EXPOSE 5000
CMD ["./main"]