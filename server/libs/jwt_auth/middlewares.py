from .api import decode_token, get_user, extract_token


async def auth_middleware(app, handler):
    async def middleware(request):

        request.user = None

        jwt_token = extract_token(request)

        payload = decode_token(request, jwt_token)

        if payload:
            user = await get_user(request, payload)

            if user:
                request.user = user

        return await handler(request)

    return middleware
