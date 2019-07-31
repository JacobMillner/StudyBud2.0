"""add long_description to subjects

Revision ID: d8c8a9cf5dfa
Revises: 
Create Date: 2019-07-31 10:25:31.054491

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd8c8a9cf5dfa'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('subjects', sa.Column(
        'long_description',
        sa.Text,
        nullable=False,
        server_default='Default subject description'))


def downgrade():
    pass
