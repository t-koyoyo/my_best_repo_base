# Makefile

up:
	docker-compose up -d --build

down:
	docker-compose down

bash-api:
	docker exec -i -t example-api /bin/bash

log-api:
	docker logs -f example-api

clear:
	docker system prune --force

clear-full:
	docker system prune --force
	docker rmi $(docker images -q)
	docker volume rm $(docker volume ls -qf dangling=true)
