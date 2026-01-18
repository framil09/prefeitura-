// Layout separado sem SessionProvider para a página de login
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
