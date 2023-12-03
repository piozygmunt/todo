FROM amazoncorretto:17-alpine-jdk as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN ./mvnw install -DskipTests


FROM amazoncorretto:17-alpine-jdk
WORKDIR /workspace/app

ARG JAR_FILE=target/*.jar
COPY --from=build /workspace/app/${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","app.jar"]

