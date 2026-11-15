"use client";

import {
  ArrowDown,
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const jobs = [
  {
    id: 1,
    company: "모노랩",
    mark: "M",
    color: "bg-indigo-100 text-indigo-800",
    title: "시니어 프로덕트 디자이너",
    role: "디자인",
    area: "서울",
    years: 5,
    salary: 7500,
    lead: false,
    summary: "복잡한 업무를 단순하게 만드는 협업 제품을 설계합니다.",
  },
  {
    id: 2,
    company: "브릭페이",
    mark: "B",
    color: "bg-blue-100 text-blue-800",
    title: "백엔드 엔지니어 · 결제 플랫폼",
    role: "개발",
    area: "서울",
    years: 3,
    salary: 6800,
    lead: false,
    summary: "결제 시스템의 안정성과 거래 처리 성능을 개선합니다.",
  },
  {
    id: 3,
    company: "루프웍스",
    mark: "L",
    color: "bg-emerald-100 text-emerald-800",
    title: "B2B 그로스 마케팅 리드",
    role: "마케팅",
    area: "경기",
    years: 7,
    salary: 9000,
    lead: true,
    summary: "기업 고객의 유입부터 전환까지 성장 전략을 수립합니다.",
  },
  {
    id: 4,
    company: "오르빗데이터",
    mark: "O",
    color: "bg-amber-100 text-amber-900",
    title: "데이터 플랫폼 엔지니어",
    role: "개발",
    area: "경기",
    years: 4,
    salary: 7200,
    lead: false,
    summary: "분석과 제품 개발에 필요한 데이터 파이프라인을 운영합니다.",
  },
  {
    id: 5,
    company: "플레인스튜디오",
    mark: "P",
    color: "bg-rose-100 text-rose-800",
    title: "브랜드 디자인 리드",
    role: "디자인",
    area: "서울",
    years: 8,
    salary: 9500,
    lead: true,
    summary: "브랜드의 시각 언어를 정립하고 팀의 디자인 방향을 이끕니다.",
  },
  {
    id: 6,
    company: "어반커넥트",
    mark: "U",
    color: "bg-sky-100 text-sky-800",
    title: "콘텐츠 마케터",
    role: "마케팅",
    area: "부산",
    years: 2,
    salary: 4800,
    lead: false,
    summary: "고객의 이야기를 발굴하고 콘텐츠 채널을 운영합니다.",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("");
  const [area, setArea] = useState("");
  const [experience, setExperience] = useState("");
  const [lead, setLead] = useState(false);
  const [sort, setSort] = useState("recent");
  const [saved, setSaved] = useState<number[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [selected, setSelected] = useState<(typeof jobs)[number]>();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    try {
      const ids: unknown = JSON.parse(
        localStorage.getItem("career-archive") ?? "[]",
      );
      if (Array.isArray(ids))
        setSaved(ids.filter((id) => typeof id === "number"));
    } catch {
      // Browsing remains available without local storage.
    }
  }, []);

  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);

  function toggleSaved(id: number) {
    const next = saved.includes(id)
      ? saved.filter((value) => value !== id)
      : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem("career-archive", JSON.stringify(next));
    } catch {
      // Keep the current session's selection when storage is unavailable.
    }
  }

  function reset() {
    setQuery("");
    setRole("");
    setArea("");
    setExperience("");
    setLead(false);
    setOnlySaved(false);
    setSort("recent");
  }

  const keyword = query.trim().toLowerCase();
  const visible = jobs.filter(
    (job) =>
      `${job.company} ${job.title} ${job.role}`
        .toLowerCase()
        .includes(keyword) &&
      (!role || job.role === role) &&
      (!area || job.area === area) &&
      (!experience || job.years <= Number(experience)) &&
      (!lead || job.lead) &&
      (!onlySaved || saved.includes(job.id)),
  );
  if (sort === "salary") visible.sort((a, b) => b.salary - a.salary);

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#152033]">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <a
            href="#"
            onClick={reset}
            className="flex items-center gap-2 font-bold tracking-tight"
          >
            <BriefcaseBusiness className="h-5 w-5 text-blue-700" aria-hidden />{" "}
            커리어 아카이브
          </a>
          <a
            href="#postings"
            onClick={() => {
              reset();
              setOnlySaved(true);
            }}
            className="flex min-h-11 items-center gap-2 text-sm font-semibold"
          >
            <Bookmark className="h-4 w-4" aria-hidden /> 저장 공고 (
            {saved.length})
          </a>
        </div>
      </header>

      <main>
        <section className="bg-[#131f37] text-white">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-blue-200">
              CAREER ARCHIVE · 경력직 채용
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              당신의 다음 커리어를
              <br />
              찾아보세요
            </h1>
            <p className="mt-4 text-sm text-slate-300 sm:text-base">
              직무와 경력에 맞는 포지션을 탐색하고 관심 공고를 모아보세요.
            </p>
            <form
              className="mt-7 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 text-slate-900"
              onSubmit={(event) => {
                event.preventDefault();
                document.getElementById("postings")?.scrollIntoView();
              }}
            >
              <Search
                className="ml-2 h-5 w-5 shrink-0 text-slate-500"
                aria-hidden
              />
              <input
                aria-label="직무 또는 회사 검색"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setOnlySaved(false);
                }}
                placeholder="직무 또는 회사를 검색해 보세요"
                className="min-w-0 flex-1 rounded px-1 py-2 text-sm"
              />
              <button className="min-h-11 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white">
                검색
              </button>
            </form>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8">
          <h2 className="mb-4 text-xl font-bold">테마로 공고 탐색</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                label: "개발자 포지션",
                detail: "제품과 플랫폼을 만드는 일",
                apply: () => setRole("개발"),
              },
              {
                label: "리더급 포지션",
                detail: "팀의 방향과 성장을 이끄는 일",
                apply: () => setLead(true),
              },
              {
                label: "서울 근무",
                detail: "서울에서 시작하는 다음 커리어",
                apply: () => setArea("서울"),
              },
            ].map((theme) => (
              <a
                key={theme.label}
                href="#postings"
                onClick={() => {
                  reset();
                  theme.apply();
                }}
                className="flex items-center justify-between rounded-xl border bg-white p-5 hover:border-blue-500"
              >
                <span>
                  <strong className="block">{theme.label}</strong>
                  <span className="mt-1 block text-sm text-slate-600">
                    {theme.detail}
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 text-blue-700" aria-hidden />
              </a>
            ))}
          </div>

          <section id="postings" className="mt-10 scroll-mt-5">
            <h2 className="text-2xl font-bold">
              {onlySaved ? "저장한 공고" : "채용공고 탐색"}
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border bg-white p-3 text-sm">
              <select
                aria-label="직무"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="min-h-11 rounded-lg border bg-white px-2"
              >
                <option value="">전체 직무</option>
                <option>개발</option>
                <option>디자인</option>
                <option>마케팅</option>
              </select>
              <select
                aria-label="지역"
                value={area}
                onChange={(event) => setArea(event.target.value)}
                className="min-h-11 rounded-lg border bg-white px-2"
              >
                <option value="">전체 지역</option>
                <option>서울</option>
                <option>경기</option>
                <option>부산</option>
              </select>
              <select
                aria-label="보유 경력"
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                className="min-h-11 rounded-lg border bg-white px-2"
              >
                <option value="">보유 경력</option>
                <option value="3">3년</option>
                <option value="5">5년</option>
                <option value="8">8년</option>
              </select>
              <label className="flex min-h-11 items-center gap-2 px-2">
                <input
                  type="checkbox"
                  checked={lead}
                  onChange={(event) => setLead(event.target.checked)}
                />{" "}
                리더급만
              </label>
              <button onClick={reset} className="min-h-11 px-2 text-blue-700">
                초기화
              </button>
            </div>
            <div className="my-4 flex items-center justify-between text-sm">
              <p aria-live="polite">{visible.length}개 공고</p>
              <label className="flex items-center gap-1">
                <ArrowDown className="h-4 w-4" aria-hidden />
                <select
                  aria-label="공고 정렬"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="min-h-11 bg-transparent"
                >
                  <option value="recent">최신순</option>
                  <option value="salary">연봉 높은 순</option>
                </select>
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((job) => (
                <article
                  key={job.id}
                  className="relative rounded-xl border bg-white p-5"
                >
                  <button
                    onClick={() => toggleSaved(job.id)}
                    aria-label={`${job.title} 저장`}
                    aria-pressed={saved.includes(job.id)}
                    className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-lg text-blue-700 hover:bg-blue-50"
                  >
                    <Bookmark
                      className={
                        saved.includes(job.id)
                          ? "h-5 w-5 fill-current"
                          : "h-5 w-5"
                      }
                    />
                  </button>
                  <div
                    className={`mb-4 grid h-11 w-11 place-items-center rounded-lg font-bold ${job.color}`}
                  >
                    {job.mark}
                  </div>
                  <p className="text-sm text-slate-600">{job.company}</p>
                  <h3 className="mt-1 font-bold">
                    <button
                      className="text-left hover:text-blue-700 hover:underline"
                      onClick={() => setSelected(job)}
                    >
                      {job.title}
                    </button>
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    {job.area} · 경력 {job.years}년 이상
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    연봉 {job.salary.toLocaleString("ko-KR")}만 원
                  </p>
                </article>
              ))}
            </div>
            {visible.length === 0 && (
              <p className="rounded-xl border bg-white p-8 text-center text-slate-600">
                {onlySaved
                  ? "조건에 맞는 저장 공고가 없습니다."
                  : "조건에 맞는 공고가 없습니다."}
              </p>
            )}
          </section>
        </div>
      </main>
      <footer className="mx-auto max-w-6xl px-5 pb-8 text-sm text-slate-600 sm:px-8">
        커리어 아카이브 · 포트폴리오용 가상 채용공고
      </footer>

      <dialog
        ref={dialog}
        onClose={() => setSelected(undefined)}
        aria-labelledby="job-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl p-6 text-slate-900 backdrop:bg-slate-950/50"
      >
        {selected && (
          <>
            <p className="text-sm text-slate-600">{selected.company}</p>
            <h2 id="job-title" className="mt-1 text-xl font-bold">
              {selected.title}
            </h2>
            <p className="mt-3 text-sm">
              {selected.area} · 경력 {selected.years}년 이상 · 연봉{" "}
              {selected.salary.toLocaleString("ko-KR")}만 원
            </p>
            <h3 className="mt-6 font-semibold">주요 업무</h3>
            <p className="mt-2 text-slate-700">{selected.summary}</p>
            <form method="dialog" className="mt-6 text-right">
              <button className="min-h-11 rounded-lg bg-slate-900 px-5 text-white">
                닫기
              </button>
            </form>
          </>
        )}
      </dialog>
    </div>
  );
}
