from marshmallow import Schema, fields
from sqlalchemy import Column, String

from .entity import Entity, Base

class User(Entity, Base):
    __tablename__ = 'users'

    username = Column(String)
    email = Column(String)
    password = Column(String)

    def __init__(self, username, email, password, created_by):
        Entity.__init__(self, created_by)
        self.username = username
        self.email = email
        self.password = password

class UserSchema(Schema):
    id = fields.Number()
    username = fields.Str()
    email = fields.Str()
    password = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()