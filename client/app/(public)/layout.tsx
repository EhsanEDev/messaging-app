import PrivacyLink from "@/components/auth/privacyLink";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full bg-muted flex min-h-svh flex-col items-center justify-center gap-6">
      {children}
      <PrivacyLink />
    </main>
  );
}
