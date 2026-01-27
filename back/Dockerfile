# Stage 1: Build
FROM gradle:latest AS builder
WORKDIR /app
COPY . .
RUN gradle build -x test

# Stage 2: Runtime
FROM mcr.microsoft.com/openjdk/jdk:25-distroless
WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /app/build/libs/back-*.jar app.jar

# Expose the port your Spring Boot application runs on
EXPOSE 8080

# Set environment variables for Spring
ENV JAVA_TOOL_OPTIONS="-XX:+UseG1GC -XX:MaxRAMPercentage=75.0"

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
