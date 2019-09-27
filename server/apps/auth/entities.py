from dataclasses import dataclass


@dataclass
class UserData:
    first_name: str
    email: str
    password: str
