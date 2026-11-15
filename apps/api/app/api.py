from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.db import get_db
from app.models import Candidate, ComparisonCriteria, DecisionCase
from app.schemas import DecisionCaseCreate, DecisionCaseRead, HealthResponse

router = APIRouter()
@router.get("/health", response_model=HealthResponse, tags=["system"])
def health() -> HealthResponse:
    return HealthResponse(status="ok")
@router.get("/decision-cases", response_model=list[DecisionCaseRead], tags=["decision-cases"])
def list_decision_cases(db: Session = Depends(get_db)) -> list[DecisionCase]:
    statement = select(DecisionCase).options(selectinload(DecisionCase.candidates), selectinload(DecisionCase.criteria)).order_by(DecisionCase.created_at.desc())
    return list(db.scalars(statement))
@router.post("/decision-cases", response_model=DecisionCaseRead, status_code=status.HTTP_201_CREATED, tags=["decision-cases"])
def create_decision_case(payload: DecisionCaseCreate, db: Session = Depends(get_db)) -> DecisionCase:
    decision_case = DecisionCase(title=payload.title, question=payload.question, budget=payload.budget, currency=payload.currency.upper())
    decision_case.candidates = [Candidate(name=item.name, purchase_price=item.purchase_price, recurring_cost=item.recurring_cost, metadata_=item.metadata) for item in payload.candidates]
    decision_case.criteria = [ComparisonCriteria(name=item.name, weight=item.weight, description=item.description) for item in payload.criteria]
    db.add(decision_case)
    db.commit()
    db.refresh(decision_case)
    return decision_case
@router.get("/decision-cases/{case_id}", response_model=DecisionCaseRead, tags=["decision-cases"])
def get_decision_case(case_id: str, db: Session = Depends(get_db)) -> DecisionCase:
    statement = select(DecisionCase).where(DecisionCase.id == case_id).options(selectinload(DecisionCase.candidates), selectinload(DecisionCase.criteria))
    decision_case = db.scalar(statement)
    if decision_case is None:
        raise HTTPException(status_code=404, detail="Decision case not found")
    return decision_case
