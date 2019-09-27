from .errors import GraphResponseError


def graph_format_error(errors: dict) -> list:

    tmp = []
    for key, value in errors.items():
        tmp.append(GraphResponseError(field=key, messages=value))
    return tmp
