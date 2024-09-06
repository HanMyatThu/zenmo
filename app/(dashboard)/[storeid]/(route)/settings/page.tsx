import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { SettingsForm } from "./_components/settings-form";

interface SettingPageProps {
  params: {
    storeId: string;
  };
}

const SettingPage = async ({ params }: SettingPageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <main className="flex-col md:ml-56">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </section>
    </main>
  );
};

export default SettingPage;
