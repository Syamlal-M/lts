# Resource Revenue management System 

This project is to track resource availability and there by forecasting revenue based on the data entered. 
This project has UI(React) and Api in (Java)

## Sandbox setup
- Install Java 11 and confgure Maven
- Generate jar using `mvn clean install`
- Execute this command`mvn spring-boot:run` to run service in localhost:8080
- Connect database with `http://localhost:8080/h2-console/` and provide database url `jdbc:h2:mem:testdb`, username `sa` and password as `password`
- For development utilize default user with userId `A-100` and password `password` that is created on startup.
- Access swagger from `http://localhost:8080/`


[Back to home](./../README.md)
