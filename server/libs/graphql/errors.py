import graphene


class GraphResponseError(graphene.ObjectType):
    field = graphene.String(required=True)
    messages = graphene.List(graphene.String, required=True)
