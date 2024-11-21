import SideBar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar />
      <main className="lg:ps-80 pt-16 lg:pt-20">{children}</main>
    </>
  );
}
