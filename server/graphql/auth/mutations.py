import graphene as graphene
from marshmallow import ValidationError

from server.apps.auth.bl import check_credentials, register_user, fetch_user
from server.apps.auth.entities import UserData
from server.graphql.auth.data_schemas import RegistrationUserSchema
from server.graphql.auth.types import RegisterInput, UserObjectType
from server.graphql.utils.helpers import get_app, get_request
from server.libs.graphql.mutations import MutationPayload
from server.libs.graphql.utils import graph_format_error
from server.libs.jwt_auth.api import encode_token, decode_token


class AuthToken(MutationPayload, graphene.Mutation):

    token = graphene.String()
    user = graphene.Field(UserObjectType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    async def mutate(self, info, email, password):

        app = get_app(info)

        if not await check_credentials(app, email, password):
            errors = dict(data="Invalid data")
            return AuthToken(errors=graph_format_error(errors))

        request = get_request(info)
        payload = dict(email=email)

        jwt_token = encode_token(request, payload)
        user = await fetch_user(request, payload)

        return AuthToken(token=jwt_token, user=user)


class RegisterUser(MutationPayload, graphene.Mutation):

    token = graphene.String()
    user = graphene.Field(UserObjectType)

    class Input:
        input_data = RegisterInput(required=True)

    async def mutate(self, info, input_data=None):

        app = get_app(info)

        try:
            data = RegistrationUserSchema().load(input_data)
        except ValidationError as e:
            return RegisterUser(errors=graph_format_error(errors=e.messages))

        user_data = UserData(**data)
        user = await register_user(app, user_data)

        request = get_request(info)
        payload = dict(email=user_data.email)
        jwt_token = encode_token(request, payload)

        return RegisterUser(token=jwt_token, user=user)


class VerifyToken(MutationPayload, graphene.Mutation):

    user = graphene.Field(UserObjectType)

    class Arguments:
        token = graphene.String(required=True)

    async def mutate(self, info, token):
        request = get_request(info)
        payload = decode_token(request, token)

        if not payload:
            return VerifyToken(user=None)

        user = await fetch_user(request, payload)
        return VerifyToken(user=user)
