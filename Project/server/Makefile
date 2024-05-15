compose:
	docker-compose up -d

keycloak:
	docker cp ticketing-realm.json server-keycloak-1:tmp/ticketing-realm.json
	docker exec -it server-keycloak-1 opt/keycloak/bin/kc.sh import --file tmp/ticketing-realm.json
	docker restart server-keycloak-1