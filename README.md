# 커리어 아카이브

경력직 채용공고 탐색 포트폴리오입니다. 현재 화면의 실행 방법과 개발 순서는 [커리어 아카이브 기획](CAREER_PLAN.md)을 참고하세요.

## 기존 BuyWise AI 백엔드 스캐폴딩

구매 목적, 예산, 총비용, 대안을 함께 비교하는 B2C 소비 의사결정 도우미의 MVP 기반입니다.

## 기술 구성

- Web: Next.js, TypeScript, Tailwind CSS, shadcn/ui 스타일 기반 컴포넌트
- API: FastAPI, Pydantic, SQLAlchemy, Alembic
- Infrastructure: PostgreSQL, Redis, Docker Compose, GitHub Actions

## 시작하기

```bash
cp .env.example .env
docker compose up --build
```

웹은 http://localhost:3000, API 문서는 http://localhost:8000/docs 에서 확인합니다.

## 도메인

- **DecisionCase**: 소비자의 구매 고민, 예산, 맥락
- **Candidate**: 비교 대상 상품 또는 서비스
- **ComparisonCriteria**: 가격·적합도·관리비 등 비교 기준과 가중치
- **AnalysisResult**: 추천 순위, 근거, 유의점, 점수표

## 다음 구현 순서

1. DecisionCase 생성 화면 및 후보 입력 플로우
2. 비교 기준 가중치와 총비용 계산
3. Redis 캐시를 사용하는 분석 작업 API
4. 점수표와 추천 근거를 제공하는 AnalysisResult 화면
5. 인증, 저장 목록, 외부 가격 정보와 LLM 스트리밍

모바일 WebView는 375px 단일 열을 기준으로 하며, 768px부터 비교표를 확장하고 1024px부터 보조 패널을 표시합니다.
