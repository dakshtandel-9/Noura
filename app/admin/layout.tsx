import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { media } from "@/content/site";
import styles from "./admin.module.css";

export const metadata: Metadata = { title: "Private admin — NOURA", robots: { index: false, follow: false } };
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main id="main" className={styles.shell}>
    <header className={styles.header}>
      <Link href="/" aria-label="NOURA home"><Image src={media.logo.src} width={54} height={60} alt="NOURA" /></Link>
      <span>Private administration</span>
      <Link href="/">Back to website</Link>
    </header>
    {children}
  </main>;
}
