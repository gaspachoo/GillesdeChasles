FROM eclipse-temurin:25-jdk-alpine AS builder
WORKDIR /app

COPY gradlew settings.gradle build.gradle gradle.properties ./
COPY gradle ./gradle

RUN chmod +x gradlew && ./gradlew --version

COPY src ./src

RUN chmod +x gradlew && ./gradlew build -x test --no-daemon

FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring
USER spring

COPY --from=builder /app/build/libs/back-*.jar app.jar

EXPOSE 8080

ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75.0"

ENTRYPOINT ["java", "-jar", "app.jar"]
