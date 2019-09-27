import graphene

from server.graphql.auth.mutations import AuthToken, RegisterUser, VerifyToken
from server.libs.jwt_auth.decorators import login_required


class Query(object):

    test = graphene.String()

    @login_required
    async def resolve_test(self, info):
        # TODO remove
        return "Test query"


class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    auth_token = AuthToken.Field()
    verify_token = VerifyToken.Field()
