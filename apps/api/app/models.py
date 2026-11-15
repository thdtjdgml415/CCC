import uuid
from datetime import datetime

from sqlalchemy import JSON, DateTime, Float, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


class DecisionCase(Base):
    __tablename__ = "decision_cases"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(160))
    question: Mapped[str] = mapped_column(Text)
    budget: Mapped[int | None] = mapped_column(Integer, nullable=True)
    currency: Mapped[str] = mapped_column(String(3), default="KRW")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    candidates: Mapped[list["Candidate"]] = relationship(back_populates="decision_case", cascade="all, delete-orphan")
    criteria: Mapped[list["ComparisonCriteria"]] = relationship(back_populates="decision_case", cascade="all, delete-orphan")
    analysis_results: Mapped[list["AnalysisResult"]] = relationship(back_populates="decision_case", cascade="all, delete-orphan")

class Candidate(Base):
    __tablename__ = "candidates"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    decision_case_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("decision_cases.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(160))
    purchase_price: Mapped[int | None] = mapped_column(Integer, nullable=True)
    recurring_cost: Mapped[int | None] = mapped_column(Integer, nullable=True)
    metadata_: Mapped[dict] = mapped_column("metadata", JSON, default=dict)
    decision_case: Mapped["DecisionCase"] = relationship(back_populates="candidates")

class ComparisonCriteria(Base):
    __tablename__ = "comparison_criteria"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    decision_case_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("decision_cases.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(80))
    weight: Mapped[float] = mapped_column(Float, default=1.0)
    description: Mapped[str | None] = mapped_column(String(300), nullable=True)
    decision_case: Mapped["DecisionCase"] = relationship(back_populates="criteria")

class AnalysisResult(Base):
    __tablename__ = "analysis_results"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    decision_case_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("decision_cases.id", ondelete="CASCADE"))
    status: Mapped[str] = mapped_column(String(24), default="pending")
    recommended_candidate_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("candidates.id"), nullable=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    scorecards: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    decision_case: Mapped["DecisionCase"] = relationship(back_populates="analysis_results")
