interface IProps {}

const Loading: React.FC<IProps> = () => {
  return (
    <main className="flex h-screen items-center justify-center flex-col gap-4 animate-pulse">
      <img src="/logo.png" alt="Logo" className="w-24 h-24 " />
      {/* <p className="text-xl font-medium">Loading...</p> */}
    </main>
  );
};

export default Loading;