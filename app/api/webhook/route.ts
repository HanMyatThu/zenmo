import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new NextResponse(`Webhook Error`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    try {
      const order = await prisma.order.update({
        where: {
          id: session?.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || "",
        },
        include: {
          orderItems: true,
        },
      });

      const variantUpdates = order.orderItems.map(async (orderItem) => {
        const variant = await prisma.variant.findUnique({
          where: { id: orderItem.variantId! },
        });

        if (!variant) {
          throw new Error(`Variant with id ${orderItem.variantId} not found.`);
        }

        if (variant.inStock < orderItem.quantity) {
          throw new Error(
            `Not enough items in stock for variant id ${orderItem.variantId}.`
          );
        }

        const updatedVariant = await prisma.variant.update({
          where: { id: variant.id },
          data: {
            inStock: variant.inStock - orderItem.quantity,
          },
        });

        return updatedVariant;
      });

      await Promise.all(variantUpdates);
    } catch (error) {
      console.error("Error in checkout session:");
    }
  }

  return new NextResponse(null, { status: 200 });
}
