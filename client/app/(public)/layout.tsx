export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // Or wrap in a minimal styled <main> if needed
}
