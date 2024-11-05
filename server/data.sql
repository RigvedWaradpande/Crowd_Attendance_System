CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- for hashed passwords
    role VARCHAR(50) NOT NULL, -- e.g., "professor" or "student"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);