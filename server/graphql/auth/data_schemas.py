from marshmallow import fields, validate

from server.libs.validators.schema import Schema


class RegistrationUserSchema(Schema):

    first_name = fields.String(required=True, validate=validate.Length(min=1))
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=3))
