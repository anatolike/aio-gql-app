from datetime import timedelta, datetime

import jwt

JWT_EXP_DELTA_SECONDS = 24 * 60 * 60  # 1 day


class JWTPolicy(object):
    def __init__(self, secret, exp=JWT_EXP_DELTA_SECONDS, algorithm="HS256"):
        self._secret = secret
        self._algorithm = algorithm
        self.exp = exp

    def patch_payload(self, payload):
        return self.set_exp(payload)

    def set_exp(self, payload):
        exp = datetime.utcnow() + timedelta(seconds=self.exp)
        payload["exp"] = payload.get("exp", exp)
        return payload

    def encode(self, payload):
        payload = self.patch_payload(payload)
        return jwt.encode(payload, self._secret, self._algorithm)

    def decode(self, jwt_token):
        return jwt.decode(jwt_token, self._secret, algorithms=self._algorithm)
