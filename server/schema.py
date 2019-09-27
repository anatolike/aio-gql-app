import graphene

import server.graphql.auth.schema


class Query(server.graphql.auth.schema.Query, graphene.ObjectType):
    pass


class Mutation(server.graphql.auth.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
