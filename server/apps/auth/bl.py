from typing import Dict

import sqlalchemy as sa
from aiohttp import web
from aiopg.sa.result import RowProxy
from werkzeug.security import generate_password_hash, check_password_hash

from server.apps.auth.entities import UserData
from server.libs.jwt_auth.api import setup
from server.libs.jwt_auth.jwt_policy import JWTPolicy
from server.libs.jwt_auth.user_policy import UserPolicy
from server.apps.users.db_utils import select_user_by_email
from server.apps.users.tables import users


def setup_jwt_auth(app: web.Application) -> None:
    config = app["config"]["app"]
    jwt_policy = JWTPolicy(secret=config["secret"])
    user_policy = UserPolicy(fetcher=fetch_user)

    setup(app=app, jwt_policy=jwt_policy, user_policy=user_policy)


async def fetch_user(request: web.Request,
                     payload: Dict[str, str]) -> RowProxy:

    email = payload["email"]

    async with request.app["db"].acquire() as conn:
        return await select_user_by_email(conn, email)


async def register_user(app: web.Application, user_data: UserData) -> RowProxy:

    async with app["db"].acquire() as conn:
        pwd = make_password(user_data.password)
        query = users.insert().values(
            first_name=user_data.first_name,
            email=user_data.email,
            password=pwd,
        )
        res = await conn.execute(query)
        row = await res.fetchone()
        return row


async def check_credentials(
    app: web.Application, email: str, password: str
) -> bool:

    async with app["db"].acquire() as conn:
        where = sa.and_(users.c.email == email)
        query = users.select().where(where)
        ret = await conn.execute(query)

        user = await ret.fetchone()
        if user is not None:
            return check_password(password, user.password)
    return False


def make_password(password: str) -> str:
    return generate_password_hash(password)


def check_password(password: str, password_hash: str) -> bool:
    return check_password_hash(password_hash, password)
