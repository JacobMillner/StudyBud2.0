from marshmallow import Schema, fields
from sqlalchemy import Column, String

from .entity import Entity, Base


class Subject(Entity, Base):
    __tablename__ = 'subjects'

    title = Column(String)
    description = Column(String)
    long_description = Column(String)

    def __init__(self, title, description, long_description, created_by):
        Entity.__init__(self, created_by)
        self.title = title
        self.description = description
        self.long_description = long_description

class SubjectSchema(Schema):
    id = fields.Number()
    title = fields.Str()
    description = fields.Str()
    long_description = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()