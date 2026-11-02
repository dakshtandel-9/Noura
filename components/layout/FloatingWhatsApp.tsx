import { getInTouch } from "@/content/home";
import styles from "./FloatingWhatsApp.module.css";

const phone = getInTouch.details.find((detail) => detail.id === "phone")?.value;
const whatsappNumber = phone?.replace(/\D/g, "");
const prefilledMessage = "Hello NOURA, I would like to explore your curated wellness experiences.";

export function FloatingWhatsApp() {
  if (!whatsappNumber) return null;

  return (
    <a
      className={styles.button}
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NOURA on WhatsApp"
      title="Chat with NOURA on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 .7A15.2 15.2 0 0 0 2.9 23.6L.8 31.2l7.8-2A15.2 15.2 0 1 0 16 .7Zm0 27.7a12.5 12.5 0 0 1-6.4-1.8l-.5-.3-4.6 1.2 1.2-4.5-.3-.5A12.5 12.5 0 1 1 16 28.4Zm6.9-9.4c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.5-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.6.1-.3.1-.5 0-.7s-.9-2.1-1.2-2.8c-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.7.1-1.1.5s-1.4 1.4-1.4 3.3 1.5 3.8 1.7 4.1c.2.3 2.9 4.4 7 6.2 1 .4 1.8.7 2.4.9 1 .3 1.9.3 2.6.2.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z" />
      </svg>
    </a>
  );
}
