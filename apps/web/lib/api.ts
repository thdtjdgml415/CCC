const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
export type DecisionCase = {
  id: string;
  title: string;
  question: string;
  budget?: number;
  currency: string;
  candidates: { name: string }[];
};
export async function getDecisionCases(): Promise<DecisionCase[]> {
  try {
    const response = await fetch(`${API_URL}/decision-cases`, {
      next: { revalidate: 0 },
    });
    return response.ok ? response.json() : [];
  } catch {
    // The landing page still works when the local API stack has not started yet.
    return [];
  }
}
