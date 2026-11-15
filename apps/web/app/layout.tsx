import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "커리어 아카이브 | 경력직 채용공고",
  description: "직무와 경력에 맞는 채용공고를 탐색하고 관심 공고를 저장하세요.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
