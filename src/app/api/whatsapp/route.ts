import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, quantity, name, phone } = body;

    if (!product || !quantity) {
      return Response.json(
        { error: "Faltan datos: producto y cantidad son requeridos" },
        { status: 400 }
      );
    }

    const orderData = {
      product: product || "Producto Tecnofy",
      quantity,
      name: name || "Cliente",
      phone: phone || "No especificado",
      payment: "Contra entrega (COD)",
      shipping: "3 a 7 días hábiles",
      createdAt: new Date().toISOString(),
    };

    console.log("📦 Nuevo pedido COD:", JSON.stringify(orderData, null, 2));

    return Response.json({
      success: true,
      message: "Pedido registrado correctamente",
      order: orderData,
    });
  } catch {
    return Response.json(
      { error: "Error al procesar el pedido" },
      { status: 500 }
    );
  }
}
