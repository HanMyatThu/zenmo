import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const store = await prisma.store.update({
      where: {
        id: params.storeid,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const store = await prisma.store.delete({
      where: {
        id: params.storeid,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
