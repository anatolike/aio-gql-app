import asyncio

from aiohttp_graphql import GraphQLView
from graphql.execution.executors.asyncio import AsyncioExecutor


def GQL(schema, graphiql=False) -> GraphQLView:

    view = GraphQLView(
        schema=schema,
        executor=AsyncioExecutor(loop=asyncio.get_event_loop()),
        graphiql=graphiql,
        enable_async=True,
    )
    return view
