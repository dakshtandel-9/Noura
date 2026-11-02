import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <FloatingWhatsApp />
    </>
  );
}
