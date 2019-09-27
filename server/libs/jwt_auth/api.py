import logging

import jwt

JWT_POLICY_KEY = "aiohttp_jwt_policy"
USER_POLICY_KEY = "aiohttp_user_policy"

DEFAULT_AUTH_HEADER_NAME = "Authorization"


def setup(app, jwt_policy, user_policy):
    app[JWT_POLICY_KEY] = jwt_policy
    app[USER_POLICY_KEY] = user_policy


def encode_token(request, payload):
    jwt_policy = request.config_dict[JWT_POLICY_KEY]
    return jwt_policy.encode(payload).decode()


def extract_token(request, auth_header_name=DEFAULT_AUTH_HEADER_NAME):
    return request.headers.get(auth_header_name, None)


def decode_token(request, jwt_token):
    jwt_policy = request.config_dict[JWT_POLICY_KEY]

    try:
        return jwt_policy.decode(jwt_token)
    except (jwt.DecodeError, jwt.ExpiredSignatureError) as e:
        logging.warning("Can not decode token, error: %s", str(e))
        return


async def get_user(request, payload):
    user_policy = request.config_dict[USER_POLICY_KEY]
    try:
        return await user_policy.fetch(request, payload)
    except Exception as e:
        logging.error(
            "Can not find user by data: %s error: %s", str(payload), str(e)
        )
        return
