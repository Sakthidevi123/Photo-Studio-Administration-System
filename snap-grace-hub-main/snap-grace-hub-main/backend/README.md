# Snap Grace Hub - Backend

Spring Boot 3 + MySQL REST API for the Snap Grace Hub frontend.

## Prereqs
- JDK 17+
- Maven 3.9+
- MySQL running locally

## Setup
1. Create database:
   ```sql
   CREATE DATABASE snap_grace_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Configure `src/main/resources/application.yml` with your DB username/password.
3. Run the app:
   ```bash
   mvn spring-boot:run
   ```
4. API base URL: `http://localhost:8080`
5. Swagger UI: `http://localhost:8080/swagger-ui/index.html`

## Endpoints
- Services: `GET/POST /api/services`, `GET/PUT/DELETE /api/services/{id}`
- Staff: `GET/POST /api/staff`, `GET/PUT/DELETE /api/staff/{id}`
- Bookings: `GET/POST /api/bookings`, `GET/PUT/DELETE /api/bookings/{id}`
- Photo deliveries: `GET/POST /api/deliveries`, `GET/PUT/DELETE /api/deliveries/{id}`
- Dashboard stats: `GET /api/dashboard/stats`

CORS is enabled for `http://localhost:5173` and `http://localhost:3000` by default.

