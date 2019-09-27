import graphene as graphene

from .errors import GraphResponseError


class MutationPayload(graphene.ObjectType):
    ok = graphene.Boolean(required=True)
    errors = graphene.List(GraphResponseError)

    def resolve_ok(self, info):
        return len(self.errors or []) == 0

    def resolve_errors(self, info):
        return self.errors or []
