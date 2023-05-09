# Setup

How to properly setup the project.

## Database
1. In the root directory, run <code>make get; make postgres;</code> to pull Postgres Docker container and run it up on port 5432.
2. In /server directory, using IntelliJ IDEA, add a new Database called **products**, run the SQL script in /server/src/main/resources/schema.sql to create the tables.
3. Add the data found in resources/products.csv and resources/profiles.csv to the tables.

## Server
Just run the server using IntelliJ IDEA as usual.

## Client
Client is already available at http://localhost:8080/ once the server has started.
