import Navbar from "./_components/navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full p-4 w-full gap-4 flex flex-col items-center justify-center  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]  from-sky-400 to-blue-800">
      <Navbar />
      {children}
    </div>
  );
}
