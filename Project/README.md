# Setup

How to properly setup the project.

## Run the containers

1. <code>cd server</code>
2. <code>make compose</code>
3. Wait for keycloak to initialize
4. <code>make keycloak</code>

## Run the ticketing API server

1. Open server folder from Intellij
2. Make sure that in application.properties <code>spring.jpa.hibernate.ddl-auto</code> is set to <code>create</code>
3. Run the Spring Boot application
4. From the second run comment <code>spring.jpa.show-sql=true
spring.jpa.defer-datasource-initialization=true
spring.sql.init.mode=always </code>
5. Make sure that <code>spring.jpa.hibernate.ddl-auto</code> is set to <code>validate</code>
