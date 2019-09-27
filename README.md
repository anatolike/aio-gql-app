
## aio-gql-app
Simple application using aiohttp and graphql.

## Software

- python3.7
- aiohttp
- graphql
- graphene
- React.js
- Apollo-client


## Features

- Registration
- Authorization
- Private routing for cabinet/public

___

## Requirements
- docker-compose

___

### Run
To start the project in develop mode, run the following command:

```
make run
```


For stop work of docker containers use:

```
make stop
```


Create new migration (new file in `migrations/versions/`):

```
make migrations # the command must be running after `make run` 
```

Apply migrations:

```
make migrate # the command must be running after `make run` 
```
