
class UserPolicy(object):
    def __init__(self, fetcher):
        assert callable(fetcher)
        self._fetcher = fetcher

    def fetch(self, request, payload):
        return self._fetcher(request, payload)
