get:
	docker pull postgres

postgres:
	docker run --name postgres-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

compose-from-scratch:
	gradle build -x test
	docker build -t server-0.1.jar .
	docker-compose up -d

update-ticketing:
	gradle build -x test
	docker build -t server-0.1.jar .
	docker-compose up -d --build API

update-auth:
	docker-compose up -d --build keycloak