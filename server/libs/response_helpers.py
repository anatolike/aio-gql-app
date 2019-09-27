from aiohttp.web_response import json_response


def response(data, errors, message, code, status):
    payload = {
        "data": data,
        "errors": errors,
        "message": message,
        "code": code,
    }
    return json_response(payload, status=status)


def ok(data=None, code=0, status=200, message: str = "success"):
    return response(
        data={} if data is None else data,
        errors={},
        message=message,
        code=code,
        status=status,
    )
