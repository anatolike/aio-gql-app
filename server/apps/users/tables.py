import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from server.migrations import metadata
from server.apps.users.enums import UserGender


__all__ = ["users", "gender_enum"]


gender_enum = postgresql.ENUM(UserGender)


users = sa.Table(
    "users",
    metadata,
    sa.Column("id", sa.Integer, primary_key=True, index=True),
    sa.Column("first_name", sa.String(250), nullable=False),
    sa.Column("last_name", sa.String(250), nullable=True),
    sa.Column("email", sa.String(250), unique=True, nullable=False),
    sa.Column("password", sa.String(250), nullable=False),
)
