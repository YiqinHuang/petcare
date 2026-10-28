import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "毛绒绒 · 宠物洗护",
  description: "毛绒绒宠物洗护：温柔洗护、造型修剪、SPA 护理，一站式照顾毛孩子。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
