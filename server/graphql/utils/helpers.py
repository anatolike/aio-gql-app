
def get_request(info):
    return info.context["request"]


def get_app(info):
    return get_request(info).app
