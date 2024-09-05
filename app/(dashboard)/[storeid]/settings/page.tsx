import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { SettingsForm } from "./_components/settings-form";

interface SettingPageProps {
  params: {
    storeid: string;
  };
}

const SettingPage = async ({ params }: SettingPageProps) => {
  const { userId } = auth();

  if (!userId) {
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
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingPage;
