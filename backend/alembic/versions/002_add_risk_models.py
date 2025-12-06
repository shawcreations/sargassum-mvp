"""Add risk tracking models

Revision ID: 002
Revises: 001
Create Date: 2024-01-15

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '002'
down_revision: Union[str, None] = '001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Satellite Layers table
    op.create_table(
        'sat_layers',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('source', sa.String(), nullable=False),
        sa.Column('date', sa.Date(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('data_type', sa.String(), nullable=True),
        sa.Column('url_or_path', sa.Text(), nullable=True),
        sa.Column('metadata_json', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_sat_layers_id', 'sat_layers', ['id'])
    op.create_index('ix_sat_layers_source', 'sat_layers', ['source'])
    op.create_index('ix_sat_layers_date', 'sat_layers', ['date'])
    
    # Beach Daily Risk table
    op.create_table(
        'beach_daily_risks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('beach_id', sa.Integer(), sa.ForeignKey('beaches.id'), nullable=False),
        sa.Column('date', sa.Date(), nullable=False),
        sa.Column('risk_level', sa.Integer(), nullable=False, default=0),
        sa.Column('source', sa.String(), nullable=True),
        sa.Column('raw_value', sa.Numeric(10, 4), nullable=True),
        sa.Column('confidence', sa.Numeric(3, 2), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_beach_daily_risks_id', 'beach_daily_risks', ['id'])
    op.create_index('ix_beach_daily_risks_beach_id', 'beach_daily_risks', ['beach_id'])
    op.create_index('ix_beach_daily_risks_date', 'beach_daily_risks', ['date'])
    
    # Alerts table
    op.create_table(
        'alerts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('beach_id', sa.Integer(), sa.ForeignKey('beaches.id'), nullable=False),
        sa.Column('date_created', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('alert_type', sa.String(), nullable=False),
        sa.Column('severity', sa.Integer(), nullable=False, default=1),
        sa.Column('message', sa.Text(), nullable=True),
        sa.Column('is_active', sa.Boolean(), default=True),
        sa.Column('resolved_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_alerts_id', 'alerts', ['id'])
    op.create_index('ix_alerts_beach_id', 'alerts', ['beach_id'])
    op.create_index('ix_alerts_date_created', 'alerts', ['date_created'])


def downgrade() -> None:
    op.drop_table('alerts')
    op.drop_table('beach_daily_risks')
    op.drop_table('sat_layers')

