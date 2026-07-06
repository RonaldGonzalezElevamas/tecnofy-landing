# 🔥 Funnel Completo — Cojín Ergonómico de Gel (COD Chile)

## Estructura del Funnel

```
Anuncio (TikTok / Meta) → Landing Page → WhatsApp → Cierre → Pedido COD → Logística
```

---

## 1. TRÁFICO (Anuncios)

**Plataformas:**
- TikTok Ads (principal)
- Meta Ads (Facebook + Instagram)

**Segmentación:**
- Ubicación: Chile (todo el país)
- Edad: 25-55 años
- Género: Hombres y mujeres
- Intereses: Salud, dolor de espalda, oficina, trabajo remoto, automóviles, gaming, emprendedores
- Comportamiento: Compradores online, usuarios de WhatsApp Business

**Presupuesto sugerido:**
- Prueba inicial: $10.000 - $20.000 CLP/día por campaña
- Escalado: $50.000+ CLP/día cuando el ROAS sea positivo

---

## 2. LANDING PAGE (Next.js)

**URL:** `tecnofy.cl` (o dominio .cl)

**Flujo del usuario en la landing:**
```
Hero → Problema → Solución → Beneficios → Testimonios → Oferta → Urg:encia → CTA Final
```

**Puntos clave:**
- Hero con dolor + solución + CTA WhatsApp
- Precio con descuento visible
- Testimonios con fotos reales
- Urgencia (stock limitado)
- Botón WhatsApp en todas las secciones
- Sticky CTA en mobile
- WhatsApp flotante siempre visible

**Métrica objetivo:**
- Click-through rate a WhatsApp: >8%
- Tasa de conversión (lead → pedido): >40%

---

## 3. WHATSAPP (Cierre Automático)

**Flujo de conversación:**

```
USUARIO: Hola 👋 quiero pedir el cojín de gel con pago contra entrega

BOT: ¡Perfecto! 🙌
Te hago unas preguntas rápidas para enviarte el pedido 👇

📍 ¿A qué ciudad de Chile lo enviamos?
📦 ¿Cuántas unidades quieres?

USUARIO: [ciudad] / [cantidad]

BOT: Genial 👌
Resumen de tu pedido:

Producto: Cojín de gel ergonómico
Envío: a [ciudad]
Pago: contra entrega

🚚 Te llegará en 2 a 5 días hábiles
💵 Pagas cuando lo recibes

¿Confirmo el envío?

USUARIO: Sí / Confirmo

BOT: Listo 🔥 tu pedido quedó registrado
Te contactaremos cuando esté en ruta 🚚
```

**Herramientas recomendadas:**
- **N8N** (self-hosted) — gratuito, automatización visual
- **ChatSimple** — diseñado para COD en LATAM
- **WATI** — para escalar con equipo
- **Mensaje manual** — al inicio, responde tú mismo

**Métricas:**
- Tasa de respuesta inicial: >90%
- Tasa de conversión (chat → pedido confirmado): >60%
- Tiempo promedio de cierre: <5 minutos

---

## 4. PEDIDO COD (Logística)

**Flujo de cumplimiento:**

```
Cliente confirma → Registrar en sistema → 
Generar orden → Enviar a proveedor/mantenedor →
Coordinar con courier → Despachar →
Notificar tracking → Cliente recibe y paga →
Confirmar pago → Cerrar orden
```

**Couriers sugeridos para Chile:**
- **Chilexpress** — cobertura nacional, confiable
- **Starken** — buenos precios, amplia cobertura
- **BlueExpress** — rápido, ideal para ciudades principales
- **Picky** — última milla, tracking en tiempo real
- **Sending** — económico para regiones

**Costos logísticos estimados:**
- RM (Santiago): $2.500 - $4.000 CLP
- Regiones: $4.000 - $7.000 CLP
- Zonas extremas (Punta Arenas, Arica): $7.000 - $12.000 CLP

---

## 5. POST-VENTA

- Mensaje de seguimiento al recibir el producto
- Pedir reseña / testimonio (importante para prueba social futura)
- Ofrecer descuento por referir a un amigo
- Lista de clientes para retargeting (Meta Pixel + WhatsApp)

---

## KPIs del Funnel

| Etapa | Métrica | Benchmark |
|-------|---------|-----------|
| Anuncio → Landing | CTR | >1.5% |
| Landing → WhatsApp | Clic a WhatsApp | >8% |
| WhatsApp → Pedido | Tasa de cierre | >40% |
| Pedido → Entregado | Tasa de entrega COD | >85% |
| Entregado → Pagado | Tasa de pago | >90% |
| **Global** | **ROAS** | **>3x** |

---

## Optimización Continua

### Pruebas A/B
- Titular del Hero (dolor vs. solución)
- Precio (oferta directa vs. precio tachado)
- CTA (WhatsApp vs. formulario)
- Testimonios (video vs. texto)
- Urgencia (stock vs. tiempo)

### Qué hacer si no funciona
1. Baja conversión en landing → mejorar copy, cambiar imágenes, probar otro CTA
2. Baja apertura en WhatsApp → cambiar mensaje inicial, ofrecer descuento directo
3. Muchos pedidos no entregados → mejorar comunicación de seguimiento, llamar antes de enviar
4. ROAS bajo → ajustar segmentación, cambiar creatividades, reducir CPA

---

## Stack Tecnológico

| Herramienta | Función | Costo |
|-------------|---------|-------|
| Next.js + Tailwind | Landing page | Gratis |
| Vercel / Netlify | Hosting landing | Gratis - $20/mes |
| WhatsApp Business API | Chat de ventas | Gratis |
| N8N / ChatSimple | Automatización WhatsApp | Gratis - $30/mes |
| Chilexpress / Starken | Logística COD | Por envío |
| Meta Ads / TikTok Ads | Tráfico pagado | Por campaña |
| Google Analytics 4 | Analítica | Gratis |
| Meta Pixel | Retargeting | Gratis |
