CONTAINER_NAME=server

# colors
GREEN = $(shell tput -Txterm setaf 2)
YELLOW = $(shell tput -Txterm setaf 3)
WHITE = $(shell tput -Txterm setaf 7)
RESET = $(shell tput -Txterm sgr0)
GRAY = $(shell tput -Txterm setaf 6)
TARGET_MAX_CHAR_NUM = 20

# Common

all: run

## Runs application. Builds, creates, starts, and attaches to containers for a service. | Common
run:
	@docker-compose up nginx frontend server

## Rebuild container
build:
	@docker-compose build server

## Stops application. Stops running container without removing them.
stop:
	@docker-compose stop

## Removes stopped service containers.
clean:
	@docker-compose down

## Runs command `bash` commands in docker container.
bash:
	@docker exec -it $(CONTAINER_NAME) bash

## Upgrade your python's dependencies:
upgrade:
	docker-compose run --rm $(CONTAINER_NAME)_app python3 -m $(CONTAINER_NAME).utils.check-requirements

## Generate html documentation. | Documentation
doc:
	@docker-compose run --rm $(CONTAINER_NAME)_app make _doc

_doc:
	@doc8 docs
	@cd docs && make html

# Linters & tests

## Formats code with `black`. | Linters
black:
	@docker-compose run --rm server black $(CONTAINER_NAME) --exclude $(CONTAINER_NAME)/migrations -l 79

## Checks types with `mypy`.
mypy:
	@docker-compose run --rm server mypy $(CONTAINER_NAME)

## Formats code with `flake8`.
lint:
	@docker-compose run --rm server flake8 $(CONTAINER_NAME)

## Runs PostgreSQL UI. | Database
psql:
	@docker exec -it $(CONTAINER_NAME)_postgres psql -U postgres

## Runs application with development config.
adev: wait_resources 
	adev runserver ./$(CONTAINER_NAME)/__main__.py -p 8080

## Runs application with specified postgres and redis.
wait_resources:
	python3 -m $(CONTAINER_NAME).utils.wait_script

## Makes migration local.
migrations:
	PYTHONPATH=$(shell pwd) $(shell pwd)/env/bin/alembic -n alembic:local revision --autogenerate;

## Upgrades database local.
migrate:
	PYTHONPATH=$(shell pwd) $(shell pwd)/env/bin/alembic -n alembic:local upgrade head;

## Upgrades database local.
downgrade:
	PYTHONPATH=$(shell pwd) $(shell pwd)/env/bin/alembic -n alembic:local downgrade -1;
