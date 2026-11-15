"""initial BuyWise domain tables"""
import sqlalchemy as sa

from alembic import op

revision = "0001_initial_domain"
down_revision = None
branch_labels = None
depends_on = None
def upgrade() -> None:
    op.create_table("decision_cases", sa.Column("id", sa.Uuid(), primary_key=True), sa.Column("title", sa.String(160), nullable=False), sa.Column("question", sa.Text(), nullable=False), sa.Column("budget", sa.Integer()), sa.Column("currency", sa.String(3), nullable=False), sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False))
    op.create_table("candidates", sa.Column("id", sa.Uuid(), primary_key=True), sa.Column("decision_case_id", sa.Uuid(), sa.ForeignKey("decision_cases.id", ondelete="CASCADE"), nullable=False), sa.Column("name", sa.String(160), nullable=False), sa.Column("purchase_price", sa.Integer()), sa.Column("recurring_cost", sa.Integer()), sa.Column("metadata", sa.JSON(), nullable=False))
    op.create_table("comparison_criteria", sa.Column("id", sa.Uuid(), primary_key=True), sa.Column("decision_case_id", sa.Uuid(), sa.ForeignKey("decision_cases.id", ondelete="CASCADE"), nullable=False), sa.Column("name", sa.String(80), nullable=False), sa.Column("weight", sa.Float(), nullable=False), sa.Column("description", sa.String(300)))
    op.create_table("analysis_results", sa.Column("id", sa.Uuid(), primary_key=True), sa.Column("decision_case_id", sa.Uuid(), sa.ForeignKey("decision_cases.id", ondelete="CASCADE"), nullable=False), sa.Column("status", sa.String(24), nullable=False), sa.Column("recommended_candidate_id", sa.Uuid(), sa.ForeignKey("candidates.id")), sa.Column("summary", sa.Text()), sa.Column("scorecards", sa.JSON(), nullable=False), sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False))
def downgrade() -> None:
    op.drop_table("analysis_results"); op.drop_table("comparison_criteria"); op.drop_table("candidates"); op.drop_table("decision_cases")
