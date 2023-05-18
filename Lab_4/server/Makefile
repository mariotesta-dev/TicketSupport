get:
	docker pull postgres

postgres:
	docker run --name postgres-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

compose-from-scratch:
	docker-compose up -d

update-auth:
	docker-compose up -d --build keycloak