import type { AppId } from "@/lib/os";

type P = { className?: string };

export function FolderIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        d="M4 12a4 4 0 0 1 4-4h11l4 5h17a4 4 0 0 1 4 4v19a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V12Z"
        fill="#8d9cb0"
      />
      <path d="M4 18h40v18a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V18Z" fill="#fff" opacity=".18" />
    </svg>
  );
}

function Page({ className, children }: P & { children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M11 5h17l9 9v29a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" fill="#eef1f5" />
      <path d="M28 5l9 9h-9V5Z" fill="#c4ccd7" />
      {children}
    </svg>
  );
}

export function MarkdownIcon({ className }: P) {
  return (
    <Page className={className}>
      <rect x="14" y="22" width="19" height="2.6" rx="1.3" fill="#9aa5b4" />
      <rect x="14" y="28" width="19" height="2.6" rx="1.3" fill="#c4ccd7" />
      <rect x="14" y="34" width="12" height="2.6" rx="1.3" fill="#c4ccd7" />
    </Page>
  );
}

export function TrashIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M12 14h24l-2.2 26a4 4 0 0 1-4 3.6H18.2a4 4 0 0 1-4-3.6L12 14Z" fill="#aab3bf" />
      <path d="M12 14h24l-.6 7H12.6L12 14Z" fill="#c8cfd8" />
      <rect x="9" y="9" width="30" height="4.5" rx="2.25" fill="#8a94a1" />
      <rect x="19" y="6" width="10" height="4" rx="2" fill="#8a94a1" />
      <rect x="19" y="24" width="2.6" height="13" rx="1.3" fill="#8a94a1" />
      <rect x="26.4" y="24" width="2.6" height="13" rx="1.3" fill="#8a94a1" />
    </svg>
  );
}

export function AppIcon({ id, className }: { id: AppId; className?: string }) {
  if (id === "projects") return <FolderIcon className={className} />;
  if (id === "trash") return <TrashIcon className={className} />;
  return <MarkdownIcon className={className} />;
}
