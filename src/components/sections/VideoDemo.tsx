import type { Product } from "@/types/product"

interface VideoDemoProps {
  product?: Product
}

const defaultVideos = [
  { src: "/video/demo-1.mp4", poster: "/video/demo-1.gif", label: "🧘 Uso en cuello y hombros" },
  { src: "/video/demo-2.mp4", poster: "/video/demo-2.gif", label: "🔥 Modo calor + amasado" },
]

export default function VideoDemo({ product }: VideoDemoProps) {
  const videos = product?.videoDemo ?? defaultVideos
  const title = product?.videoDemoTitle ?? "Míralo en acción"
  const description = product?.videoDemoDescription ?? "Un video vale más que mil fotos — mira lo fácil que es usarlo"

  return (
    <section className="py-16 md:py-20" id="video-demo">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-2">
          {title}
        </p>
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-2">
          ¿Cómo funciona?
        </h2>
        <p className="text-[var(--gray-500)] max-w-xl mx-auto mb-10">
          {description}
        </p>
      </div>
      <div className="container mx-auto px-4 max-w-lg">
        <div className="flex flex-col gap-8">
          {videos.map((v, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden shadow-xl bg-[var(--gray-100)]"
            >
              <video
                src={v.src}
                poster={v.poster}
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-h-[85vh] object-contain bg-black/5"
                preload="auto"
              />
              <div className="px-5 py-4 text-sm text-[var(--gray-500)] font-medium">
                {v.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
