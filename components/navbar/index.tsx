import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

import { MainNav } from "@/components/navbar/main-nav";
import { StoreSwitcher } from "@/components/common/store-switcher";
import prisma from "@/lib/prisma";

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({
    where: {
      userId: userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
