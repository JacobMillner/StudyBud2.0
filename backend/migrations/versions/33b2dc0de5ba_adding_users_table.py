"""adding users table

Revision ID: 33b2dc0de5ba
Revises: d8c8a9cf5dfa
Create Date: 2019-08-05 15:25:01.742712

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '33b2dc0de5ba'
down_revision = 'd8c8a9cf5dfa'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('password', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime())
    )
    pass


def downgrade():
    op.drop_table('users')
    pass
