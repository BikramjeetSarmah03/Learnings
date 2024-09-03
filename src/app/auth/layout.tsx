interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <main className="flex items-center h-full justify-center  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]  from-sky-400 to-blue-800">
      {children}
    </main>
  );
}
