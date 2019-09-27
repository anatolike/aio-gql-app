from functools import wraps

from aiohttp import web


def user_passes_test(test_func, exc=web.HTTPUnauthorized()):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            info = args[-1]
            try:
                request = info.context["request"]
            except Exception as e:
                msg = (
                    "Incorrect decorator usage. "
                    "Expecting `request` in context of graphql ResolveInfo "
                    "`def resolver(info)` error: %s" % str(e)
                )
                raise RuntimeError(msg)
            if not isinstance(request, web.BaseRequest):
                msg = "Incorrect decorator usage. " "Expecting `request`"
                raise RuntimeError(msg)

            if test_func(request):
                return f(*args, **kwargs)

            raise exc

        return wrapper

    return decorator


login_required = user_passes_test(lambda request: request.user is not None)
