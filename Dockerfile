FROM golang:1.23-alpine

WORKDIR /app

# Install dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN go build -o main ./cmd/server

# Expose the port
EXPOSE 8080

# Run the application
CMD ["./main"]