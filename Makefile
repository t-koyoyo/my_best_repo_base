# Makefile

up:
	docker-compose up -d --build

down:
	docker-compose down

bash-api:
	docker exec -i -t XXXXX-api /bin/bash

log-api:
	docker logs -f XXXXX-api

clear:
	docker system prune --force

clear-full:
	docker system prune --force
	docker rmi $(docker images -q)
	docker volume rm $(docker volume ls -qf dangling=true)
