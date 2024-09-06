import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { Request } from "express";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  proxy: "baseUrlForTheAPI",
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params;
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
      },
    });
    if (!store) {
      return new NextResponse("Store Not Found", { status: 404 });
    }

    return NextResponse.json(
      { name: store.name, id: store.id },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.log("[STORE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
