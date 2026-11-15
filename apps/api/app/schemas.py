from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class CandidateCreate(BaseModel):
    name: str = Field(min_length=1, max_length=160)
    purchase_price: int | None = Field(default=None, ge=0)
    recurring_cost: int | None = Field(default=None, ge=0)
    metadata: dict = Field(default_factory=dict)
class CandidateRead(CandidateCreate):
    id: UUID
    metadata: dict = Field(validation_alias="metadata_")
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
class CriteriaCreate(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    weight: float = Field(default=1, ge=0, le=10)
    description: str | None = Field(default=None, max_length=300)
class CriteriaRead(CriteriaCreate):
    id: UUID
    model_config = ConfigDict(from_attributes=True)
class DecisionCaseCreate(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    question: str = Field(min_length=1)
    budget: int | None = Field(default=None, ge=0)
    currency: str = Field(default="KRW", min_length=3, max_length=3)
    candidates: list[CandidateCreate] = Field(default_factory=list)
    criteria: list[CriteriaCreate] = Field(default_factory=list)
class DecisionCaseRead(BaseModel):
    id: UUID
    title: str
    question: str
    budget: int | None
    currency: str
    created_at: datetime
    candidates: list[CandidateRead]
    criteria: list[CriteriaRead]
    model_config = ConfigDict(from_attributes=True)
class HealthResponse(BaseModel):
    status: str
