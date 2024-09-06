import Navbar from "@/components/navbar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
  const { storeId } = params;
  const { userId } = auth();

  if (!storeId || !userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  if (!stores.length) {
    redirect("/");
  }
  return (
    <div>
      <Navbar items={stores} />
      {children}
    </div>
  );
};

export default DashboardLayout;
