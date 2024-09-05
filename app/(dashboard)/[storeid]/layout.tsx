import { Navbar } from "@/components/navbar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    storeid: string;
  };
}

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
  const { storeid } = params;
  const { userId } = auth();

  if (!storeid || !userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeid,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
