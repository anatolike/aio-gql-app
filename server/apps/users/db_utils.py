from aiopg.sa import SAConnection
from aiopg.sa.result import RowProxy

from server.apps.users.tables import users


async def select_user_by_id(conn: SAConnection, key: int) -> RowProxy:
    query = users.select().where(users.c.id == key).order_by(users.c.id)
    cursor = await conn.execute(query)
    return await cursor.fetchone()


async def select_user_by_email(conn: SAConnection, email: str) -> RowProxy:
    query = users.select().where(users.c.email == email).order_by(users.c.id)

    cursor = await conn.execute(query)
    return await cursor.fetchone()
