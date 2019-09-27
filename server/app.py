from pathlib import Path
from typing import Optional, List

import aiopg.sa
from aiohttp import web
from aiohttp_session import setup as setup_session
from aiohttp_session.redis_storage import RedisStorage
from aioredis import create_pool

from server.apps.auth.bl import setup_jwt_auth as setup_jwt_auth
from server.libs.jwt_auth.middlewares import auth_middleware
from server.routes import init_routes
from server.utils.common import init_config

path = Path(__file__).parent


async def database(app: web.Application) -> None:
    """
    A function that, when the server is started, connects to postgresql,
    and after stopping it breaks the connection (after yield)
    """
    config = app["config"]["postgres"]

    engine = await aiopg.sa.create_engine(**config)
    app["db"] = engine

    yield

    app["db"].close()
    await app["db"].wait_closed()


async def redis(app: web.Application) -> None:

    config = app["config"]["redis"]
    app["redis"] = await create_pool((config["host"], config["port"]))

    setup_session(app, RedisStorage(app["redis"]))  # TODO move to init_app

    yield

    app["redis"].close()
    await app["redis"].wait_closed()


def init_app(config: Optional[List[str]] = None) -> web.Application:
    app = web.Application(middlewares=[auth_middleware])

    init_config(app, config=config)
    init_routes(app)

    setup_jwt_auth(app)

    app.cleanup_ctx.extend([database, redis])

    return app
