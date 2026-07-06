import nodemailer from "nodemailer"

interface OrderNotification {
  id: string
  productName: string
  quantity: number
  totalPrice: number
  customer: { nombre: string; apellido: string; telefono: string; email: string }
  shippingAddress: { direccion: string; numero: string; comuna: string; region: string; referencia: string }
  notes: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendOrderEmail(order: OrderNotification): Promise<boolean> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return false

  const adminEmail = process.env.ADMIN_EMAIL || "contacto.elevamas@gmail.com"

  try {
    await transporter.sendMail({
      from: `"Tecnofy Pedidos" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `🛒 Nuevo pedido: ${order.id} — ${order.customer.nombre} ${order.customer.apellido}`,
      html: `
        <h2>🛒 Nuevo Pedido</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td colspan="2"><strong>Pedido #${order.id}</strong></td></tr>
          <tr><td>Producto</td><td>${order.productName} x${order.quantity}</td></tr>
          <tr><td>Total</td><td><strong>$${order.totalPrice.toLocaleString("es-CL")}</strong></td></tr>
          <tr><td colspan="2"><strong>👤 Cliente</strong></td></tr>
          <tr><td>Nombre</td><td>${order.customer.nombre} ${order.customer.apellido}</td></tr>
          <tr><td>Teléfono</td><td><a href="tel:${order.customer.telefono}">${order.customer.telefono}</a></td></tr>
          <tr><td>Email</td><td>${order.customer.email || "—"}</td></tr>
          <tr><td colspan="2"><strong>📍 Dirección</strong></td></tr>
          <tr><td>Dirección</td><td>${order.shippingAddress.direccion} ${order.shippingAddress.numero}</td></tr>
          <tr><td>Comuna/Región</td><td>${order.shippingAddress.comuna}, ${order.shippingAddress.region}</td></tr>
          <tr><td>Referencia</td><td>${order.shippingAddress.referencia || "—"}</td></tr>
          <tr><td>Observaciones</td><td>${order.notes || "—"}</td></tr>
        </table>
        <p style="margin-top:16px">
          <a href="https://tecnofy.cl/admin" style="background:#0066FF;color:white;padding:10px 20px;text-decoration:none;border-radius:8px">
            Ver en Admin
          </a>
        </p>
      `.trim(),
    })
    return true
  } catch (error) {
    console.warn("[Email] Error enviando notificación:", error)
    return false
  }
}
