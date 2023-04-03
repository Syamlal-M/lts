# Use an official Maven runtime as a parent image
FROM maven:3.8.4-jdk-11 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Use an official OpenJDK runtime as a parent image
FROM openjdk:11-jdk-slim
WORKDIR /app
COPY --from=build /app/target/api-service-leave-forcasting-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
CMD ["java", "-jar", "api-service-leave-forcasting-0.0.1-SNAPSHOT.jar"]
