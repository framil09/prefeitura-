import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { PrefeitosAdmin } from "./_components/prefeitosapi-admin";

export const metadata = {
  title: "Gestão de Prefeitosapi | Admin",
};

export default async function PrefeitosAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="p-8">
      <PrefeitosAdmin />
    </div>
  );
}
