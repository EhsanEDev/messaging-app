import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <main className="flex h-screen items-center justify-center flex-col gap-4 animate-pulse">
      <Image src="/logo.png" width={64} height={64} alt="Logo" className="w-24 h-24 " priority />
      {/* <p className="text-xl font-medium">Loading...</p> */}
    </main>
  );
};

export default Loading;