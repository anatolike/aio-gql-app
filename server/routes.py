import logging
import pathlib

from aiohttp import web

from server.libs.graphql.view import GQL
from server.schema import schema

PROJECT_PATH = pathlib.Path(__file__).parent


logger = logging.getLogger(__name__)


def init_routes(app: web.Application) -> None:

    add_route = app.router.add_route

    add_route("*", "/gql/", GQL(schema, graphiql=False))
    add_route("*", "/graphiql", GQL(schema, graphiql=True))
