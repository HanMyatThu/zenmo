import prisma from "@/lib/prisma";

interface DashboardProps {
  params: {
    storeid: string;
  };
}

const DashboardPage = async ({ params }: DashboardProps) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeid,
    },
  });
  return (
    <div>
      <h1>Active Store {store?.name}</h1>
    </div>
  );
};

export default DashboardPage;
