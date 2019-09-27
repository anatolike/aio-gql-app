import graphene


class RegisterInput(graphene.InputObjectType):
    first_name = graphene.String(required=True)
    email = graphene.String(required=True)
    password = graphene.String(required=True)


class UserObjectType(graphene.ObjectType):
    id = graphene.Int()
    first_name = graphene.String()
    email = graphene.String()
